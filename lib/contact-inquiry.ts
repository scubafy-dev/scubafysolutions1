import * as z from "zod"

export const services = ["Website", "Web app", "Mobile app", "AI product", "E-commerce", "Not sure yet"] as const
export const budgetOptions = [
  "Less than $5k",
  "$5k – $10k",
  "$10k – $20k",
  "$20k – $50k",
  "$50k – $100k",
  "More than $100k",
] as const

export const contactInquirySchema = z.object({
  service: z.enum(services, { errorMap: () => ({ message: "Choose what you need done." }) }),
  budget: z.enum(budgetOptions, { errorMap: () => ({ message: "Choose a budget range." }) }),
  name: z.string().trim().min(2, "Name needs at least 2 characters.").max(200),
  email: z.string().trim().email("Enter a valid email address.").max(320),
  note: z.string().trim().max(4000, "Keep this under 4000 characters."),
  submissionId: z.string().uuid(),
})

export type ContactInquiry = z.infer<typeof contactInquirySchema>
