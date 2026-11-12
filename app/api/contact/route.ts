import { Resend } from "resend"
import { NextResponse } from "next/server"
import { contactConfirmation } from "@/lib/contact-confirmation"
import { contactInquirySchema } from "@/lib/contact-inquiry"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 })
  }

  const parsed = contactInquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Check the form and try again." }, { status: 400 })
  }

  const inquiry = parsed.data
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ success: false, error: "Email is not configured." }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const message = contactConfirmation(inquiry)
  const { error } = await resend.emails.send(
    {
      from: message.from,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
    },
    { idempotencyKey: `contact-received/${inquiry.submissionId}` },
  )

  if (error) {
    console.error("Contact confirmation failed:", error.message)
    return NextResponse.json({ success: true, confirmed: false })
  }

  return NextResponse.json({ success: true, confirmed: true })
}
