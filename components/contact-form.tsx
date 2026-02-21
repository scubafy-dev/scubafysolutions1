"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e6d36c0d-db93-4fb7-8ce6-a0398b175bf8",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        reset()
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
        console.error("Form submission failed:", result)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="w-full px-4 py-3 bg-background border border-border/30 rounded-md font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-background border border-border/30 rounded-md font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={6}
          className="w-full px-4 py-3 bg-background border border-border/30 rounded-md font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="mt-1 font-mono text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-accent text-accent-foreground font-mono text-sm uppercase tracking-wider rounded-md hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {submitStatus === "success" && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-md">
          <p className="font-mono text-sm text-green-400">
            Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
          <p className="font-mono text-sm text-red-400">
            Something went wrong. Please try again or email us directly at developer@scubafy.co
          </p>
        </div>
      )}
    </form>
  )
}

