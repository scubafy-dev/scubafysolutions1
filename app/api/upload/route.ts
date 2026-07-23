import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 })
  }

  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 })
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const safeName = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(safeName, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      return NextResponse.json({ url: blob.url })
    }

    // Local fallback for development without Vercel Blob
    const bytes = Buffer.from(await file.arrayBuffer())
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })
    const filename = safeName.replace("blog/", "")
    await writeFile(path.join(uploadsDir, filename), bytes)
    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error("Upload failed:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
