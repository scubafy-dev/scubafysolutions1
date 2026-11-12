"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { budgetOptions, contactInquirySchema, services, type ContactInquiry } from "@/lib/contact-inquiry"

const formSchema = contactInquirySchema.omit({ submissionId: true })
type FormData = Omit<ContactInquiry, "submissionId">

const steps = [
  { title: "What do you need done?", field: "service" as const, options: services },
  { title: "What's the budget?", field: "budget" as const, options: budgetOptions },
]

const inputClass =
  "w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
const labelClass = "font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"

export function ContactForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "received" | "error">("idle")
  const advanceTimer = useRef<number | null>(null)
  const submissionId = useRef(crypto.randomUUID())

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { note: "" },
  })

  const selectedService = watch("service")
  const selectedBudget = watch("budget")
  const selected = step === 0 ? selectedService : selectedBudget
  const done = submitStatus === "success" || submitStatus === "received"

  function choose(field: "service" | "budget", value: FormData["service"] | FormData["budget"]) {
    clearErrors()
    setValue(field, value)
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => setStep((current) => Math.min(current + 1, 2)), 160)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    const note = data.note.trim()

    try {
      const payload = {
        name: data.name,
        email: data.email,
        service: data.service,
        budget: data.budget,
        note,
        submissionId: submissionId.current,
      }
      const [leadResponse, confirmResponse] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: "6e63bcfc-84d3-4d74-b1ef-5f6eddbff1b8",
            name: data.name,
            email: data.email,
            service: data.service,
            budget: data.budget,
            message: [`Project: ${data.service}`, `Budget: ${data.budget}`, note].filter(Boolean).join("\n\n"),
          }),
        }),
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ])

      const lead = (await leadResponse.json()) as { success?: boolean }
      const result = (await confirmResponse.json()) as { success?: boolean; confirmed?: boolean }

      if (lead.success && result.success && result.confirmed) {
        submissionId.current = crypto.randomUUID()
        setSubmitStatus("success")
      } else if (lead.success && result.success) {
        setSubmitStatus("received")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={(event) => {
          if (step < 2) {
            event.preventDefault()
            return
          }
          void handleSubmit(onSubmit)(event)
        }}
      >
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {done ? "Sent" : `Step ${step + 1} of 3`}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`h-1.5 w-6 ${
                  done || index <= step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <p className="font-[var(--font-bebas)] text-4xl tracking-tight md:text-5xl">We'll reply by email.</p>
            {submitStatus === "received" ? (
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                Your message is with us. The confirmation email still needs to be sent.
              </p>
            ) : null}
          </div>
        ) : (
          <div aria-live="polite">
            {step < 2 ? (
              <fieldset className="border-0 p-0">
                <legend className="mx-auto mb-8 block w-full text-center font-[var(--font-bebas)] text-4xl tracking-tight md:text-5xl">
                  {steps[step].title}
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {steps[step].options.map((option) => {
                    const isSelected = selected === option
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => choose(steps[step].field, option)}
                        className={`min-h-11 border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isSelected
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border/50 text-foreground hover:border-accent hover:text-accent"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                {step === 0 && errors.service ? (
                  <p className="mt-4 text-center font-mono text-xs text-destructive">{errors.service.message}</p>
                ) : null}
                {step === 1 && errors.budget ? (
                  <p className="mt-4 text-center font-mono text-xs text-destructive">{errors.budget.message}</p>
                ) : null}
              </fieldset>
            ) : (
              <div className="space-y-5">
                <h3 className="mb-8 text-center font-[var(--font-bebas)] text-4xl tracking-tight md:text-5xl">
                  Where do we reply?
                </h3>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={`${inputClass} mt-2`}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p className="mt-2 font-mono text-xs text-destructive">{errors.name.message}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`${inputClass} mt-2`}
                    placeholder="you@company.com"
                  />
                  {errors.email ? (
                    <p className="mt-2 font-mono text-xs text-destructive">{errors.email.message}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="note" className={labelClass}>
                    Anything else
                  </label>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">Optional. Add whatever you want us to know.</p>
                  <textarea
                    {...register("note")}
                    id="note"
                    rows={5}
                    className={`${inputClass} mt-2 resize-y`}
                    placeholder="Tell us about the project..."
                  />
                  {errors.note ? (
                    <p className="mt-2 font-mono text-xs text-destructive">{errors.note.message}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex h-12 w-full items-center justify-center border border-accent bg-accent font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending…" : "Send"}
                </button>
                {submitStatus === "error" ? (
                  <p className="text-center font-mono text-xs text-destructive">
                    That didn't send. Try again, or email contact@scubafysolutions.com.
                  </p>
                ) : null}
              </div>
            )}

            {step > 0 ? (
              <button
                type="button"
                onClick={() => {
                  if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
                  setStep((current) => current - 1)
                }}
                className="mx-auto mt-8 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Back
              </button>
            ) : null}
          </div>
        )}
      </form>

      <a
        href="https://calendly.com/amadeus-christensen-scubafy/new-meeting"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Book a meeting
      </a>
    </div>
  )
}
