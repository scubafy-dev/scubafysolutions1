"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Plus, Trash2 } from "lucide-react"
import {
  createPostAction,
  updatePostAction,
  type BlogFormState,
} from "@/lib/actions/blog"
import type { Post } from "@/lib/db/schema"
import { slugify } from "@/lib/blog-client"
import { parseContentImages, serializeContentImages } from "@/lib/content-images"

const initialState: BlogFormState = {}

const inputClass =
  "w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm outline-none focus:border-accent"
const labelClass = "font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
const hintClass = "font-mono text-[10px] text-muted-foreground"
const boxClass = "space-y-5 border border-border/30 p-5 md:p-6"

type Props = {
  post?: Post
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      {children}
      {hint ? <p className={hintClass}>{hint}</p> : null}
    </div>
  )
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function PostEditor({ post }: Props) {
  const isEdit = Boolean(post)
  const action = isEdit ? updatePostAction : createPostAction
  const [state, formAction, pending] = useActionState(action, initialState)
  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug))
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "")
  const [ogImage, setOgImage] = useState(post?.ogImage ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const [imageRows, setImageRows] = useState<{ id: string; url: string }[]>(() => {
    const existing = parseContentImages(post?.contentImages)
    if (existing.length === 0) return [{ id: "row-1", url: "" }]
    return existing.map((url, index) => ({ id: `row-${index + 1}`, url }))
  })
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "")
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title))
    }
  }, [title, slugTouched])

  function newRowId() {
    return `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  }

  function addImageRow() {
    setImageRows((prev) => [...prev, { id: newRowId(), url: "" }])
  }

  function updateImageRow(id: string, url: string) {
    setImageRows((prev) => prev.map((row) => (row.id === id ? { ...row, url } : row)))
  }

  function removeImageRow(id: string) {
    setImageRows((prev) => {
      const next = prev.filter((row) => row.id !== id)
      return next.length > 0 ? next : [{ id: newRowId(), url: "" }]
    })
  }

  async function uploadFile(file: File, target: "cover" | "og" | "content") {
    setUploading(true)
    setUploadError(null)
    try {
      const body = new FormData()
      body.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Upload failed")
      }
      if (target === "cover") {
        setCoverImage(data.url)
      } else if (target === "og") {
        setOgImage(data.url)
      } else {
        setImageRows((prev) => {
          const emptyIndex = prev.findIndex((row) => !row.url.trim())
          if (emptyIndex >= 0) {
            return prev.map((row, index) =>
              index === emptyIndex ? { ...row, url: data.url as string } : row,
            )
          }
          return [...prev, { id: newRowId(), url: data.url as string }]
        })
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const contentImagesJson = serializeContentImages(imageRows.map((row) => row.url))
  const metaTitleLen = metaTitle.length || title.length
  const metaDescLen = metaDescription.length

  return (
    <form action={formAction} className="mx-auto w-full max-w-3xl space-y-6">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="ogImage" value={ogImage} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="contentImages" value={contentImagesJson} />

      {state.error ? <p className="font-mono text-xs text-destructive text-center">{state.error}</p> : null}
      {state.success ? <p className="font-mono text-xs text-accent text-center">{state.success}</p> : null}

      {/* Basics */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Post</legend>

        <Field label="Title">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <Field label="Slug" hint={`Public URL: /blog/${slug || "…"}`}>
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(slugify(e.target.value))
            }}
            className={inputClass}
          />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the blog list and as a meta fallback.">
          <textarea name="excerpt" defaultValue={post?.excerpt ?? ""} rows={3} className={`${inputClass} resize-y`} />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Category" hint="e.g. Web Development">
            <input name="category" defaultValue={post?.category ?? ""} className={inputClass} />
          </Field>
          <Field label="Author name" hint="Defaults to Scubafy Solutions in schema markup.">
            <input
              name="authorName"
              defaultValue={post?.authorName ?? ""}
              placeholder="Scubafy Solutions"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Tags" hint="Comma-separated, e.g. nextjs, seo, neon">
          <input name="tags" defaultValue={post?.tags ?? ""} className={inputClass} />
        </Field>
      </fieldset>

      {/* Cover */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Cover image</legend>
        {coverImage ? (
          <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden border border-border/40">
            <Image src={coverImage} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3 items-center">
          <label className="cursor-pointer border border-border/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors">
            {uploading ? "Uploading…" : "Upload cover"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void uploadFile(file, "cover")
                e.target.value = ""
              }}
            />
          </label>
          <input
            type="url"
            placeholder="Or paste image URL"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className={`${inputClass} flex-1 min-w-[200px] py-2 text-xs`}
          />
        </div>
        <Field label="Cover image alt text" hint="Describe the image for accessibility and image SEO.">
          <input name="coverImageAlt" defaultValue={post?.coverImageAlt ?? ""} className={inputClass} />
        </Field>
      </fieldset>

      {/* Content */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Content</legend>
        <p className={hintClass}>
          Paste image URLs below. They save with the post and appear as an auto-playing slideshow on the
          public page. Use + to add more.
        </p>

        <div className="space-y-3 border border-border/40 p-4">
          <p className={labelClass}>Content image URLs (slideshow)</p>

          <div className="space-y-3">
            {imageRows.map((row, index) => (
              <div key={row.id} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground w-5 shrink-0">
                  {index + 1}.
                </span>
                <input
                  type="url"
                  value={row.url}
                  onChange={(e) => updateImageRow(row.id, e.target.value)}
                  placeholder="https://… image URL"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeImageRow(row.id)}
                  aria-label="Remove image URL"
                  className="shrink-0 flex h-11 w-11 items-center justify-center border border-border/50 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={addImageRow}
              aria-label="Add another image URL"
              className="flex items-center gap-2 border border-accent bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add image
            </button>
            <label className="cursor-pointer border border-border/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors">
              {uploading ? "Uploading…" : "Upload file"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void uploadFile(file, "content")
                  e.target.value = ""
                }}
              />
            </label>
          </div>

          {imageRows.some((row) => row.url.trim()) ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {imageRows
                .filter((row) => row.url.trim())
                .map((row, index) => (
                  <li key={row.id} className="border border-border/40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={row.url.trim()} alt={`Preview ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                  </li>
                ))}
            </ul>
          ) : null}
          {uploadError ? <p className="font-mono text-xs text-destructive">{uploadError}</p> : null}
        </div>

        <div className="space-y-2 pt-2">
          <label className={labelClass}>Post body (Markdown)</label>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            className={`${inputClass} resize-y leading-relaxed`}
            placeholder="Write your post in Markdown…"
          />
        </div>
      </fieldset>

      {/* Search SEO */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Search SEO</legend>

        <Field
          label="Meta title"
          hint={`${metaTitleLen}/60 chars recommended. Leave blank to use the post title.`}
        >
          <input
            name="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder={title || "Defaults to post title"}
            className={inputClass}
          />
        </Field>

        <Field
          label="Meta description"
          hint={`${metaDescLen}/160 chars recommended. Shown in Google results.`}
        >
          <textarea
            name="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            placeholder="Defaults to excerpt"
            className={`${inputClass} resize-y`}
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Focus keyword" hint="Primary phrase this post should rank for.">
            <input name="focusKeyword" defaultValue={post?.focusKeyword ?? ""} className={inputClass} />
          </Field>
          <Field label="Keywords" hint="Comma-separated secondary keywords.">
            <input name="keywords" defaultValue={post?.keywords ?? ""} className={inputClass} />
          </Field>
        </div>

        <Field
          label="Canonical URL"
          hint="Optional. Use only if this content also lives elsewhere. Defaults to /blog/slug."
        >
          <input
            name="canonicalUrl"
            type="url"
            defaultValue={post?.canonicalUrl ?? ""}
            placeholder="https://yoursite.com/blog/slug"
            className={inputClass}
          />
        </Field>
      </fieldset>

      {/* Social / Open Graph */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Social sharing (Open Graph)</legend>

        <Field label="OG title" hint="Defaults to meta title / post title.">
          <input name="ogTitle" defaultValue={post?.ogTitle ?? ""} className={inputClass} />
        </Field>

        <Field label="OG description" hint="Defaults to meta description / excerpt.">
          <textarea
            name="ogDescription"
            defaultValue={post?.ogDescription ?? ""}
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </Field>

        {ogImage ? (
          <div className="relative mx-auto aspect-[1.91/1] w-full max-w-md overflow-hidden border border-border/40">
            <Image src={ogImage} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : null}
        <Field label="OG image" hint="Defaults to cover image. Ideal ~1200×630.">
          <div className="flex flex-wrap gap-3 items-center">
            <label className="cursor-pointer border border-border/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors">
              {uploading ? "Uploading…" : "Upload OG"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void uploadFile(file, "og")
                  e.target.value = ""
                }}
              />
            </label>
            <input
              type="url"
              placeholder="Or paste image URL"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className={`${inputClass} flex-1 min-w-[200px] py-2 text-xs`}
            />
          </div>
        </Field>
      </fieldset>

      {/* Publishing */}
      <fieldset className={boxClass}>
        <legend className={`${labelClass} px-2 text-accent`}>Publishing</legend>
        <div className="flex flex-col gap-4">
          <Field
            label="Post date"
            hint="Shown on the blog. Defaults to today when published if left blank."
          >
            <input
              type="date"
              name="publishedAt"
              defaultValue={toDateInputValue(
                post?.publishedAt ? new Date(post.publishedAt) : new Date(),
              )}
              className={inputClass}
            />
          </Field>
          <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? false}
              className="accent-[var(--accent)] h-4 w-4"
            />
            Published (visible on /blog)
          </label>
          <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest cursor-pointer">
            <input
              type="checkbox"
              name="noIndex"
              defaultChecked={post?.noIndex ?? false}
              className="accent-[var(--accent)] h-4 w-4"
            />
            Noindex (hide from search engines)
          </label>
          {post?.archived ? (
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              This post is archived and hidden from the public blog.
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={pending || uploading}
          className="border border-accent bg-accent/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
      </div>
    </form>
  )
}
