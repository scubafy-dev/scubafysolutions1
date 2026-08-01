"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const budgetOptions = ["Less than $5k", "$5k – $10k", "$10k – $20k", "$20k – $50k", "$50k – $100k", "More than $100k"] as const

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  budget: z.enum(budgetOptions, { errorMap: () => ({ message: "Please select a budget range" }) }),
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
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const selectedBudget = watch("budget")

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
          budget: data.budget,
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
        <span className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
          What is your project budget?
        </span>
        <input type="hidden" {...register("budget")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setValue("budget", option, { shouldValidate: true })}
              aria-pressed={selectedBudget === option}
              className={`px-4 py-3 border rounded-md font-mono text-xs text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                selectedBudget === option
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-foreground border-border/30 hover:border-accent/60"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.budget && (
          <p className="mt-1 font-mono text-xs text-red-400">{errors.budget.message}</p>
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

      <div className="relative flex items-center gap-4">
        <div className="h-px flex-1 bg-border/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border/30" />
      </div>

      <a
        href="https://calendly.com/amadeus-christensen-scubafy/new-meeting"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-3 border border-border/30 bg-background text-foreground font-mono text-sm uppercase tracking-wider rounded-md text-center hover:border-accent hover:text-accent transition-colors duration-200"
      >
        Book a Meeting
      </a>

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
            Something went wrong. Please try again or email us directly at contact@scubafysolutions.com
          </p>
        </div>
      )}
    </form>
  )
}
