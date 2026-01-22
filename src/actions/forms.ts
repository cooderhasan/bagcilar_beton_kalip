'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Contact Form Schema
const ContactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(2),
    message: z.string().min(10),
})

export async function submitContactForm(formData: FormData) {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return { error: "Lütfen tüm alanları doğru şekilde doldurun." }
    }

    try {
        await prisma.contactForm.create({
            data: validatedFields.data,
        })
        return { success: true }
    } catch (error) {
        console.error("Contact form error:", error)
        return { error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." }
    }
}

// Quote Form Schema
const QuoteSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    company: z.string().optional(),
    productInterest: z.string().optional(),
    message: z.string().min(10),
})

export async function submitQuoteForm(formData: FormData) {
    const validatedFields = QuoteSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        productInterest: formData.get('productId'), // Mapped from select name
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return { error: "Lütfen zorunlu alanları doldurun." }
    }

    try {
        await prisma.quoteRequest.create({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
                company: validatedFields.data.company || "",
                productInterest: validatedFields.data.productInterest || "",
                message: validatedFields.data.message,
            },
        })
        return { success: true }
    } catch (error) {
        console.error("Quote form error:", error)
        return { error: "Bir hata oluştu." }
    }
}

// Career Form Schema
const CareerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    position: z.string().min(2),
    message: z.string().optional(),
    // cvUrl handling would normally go here, simplified for text fields first
})

export async function submitCareerForm(formData: FormData) {
    const validatedFields = CareerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return { error: "Lütfen zorunlu alanları doldurun." }
    }

    try {
        // Note: File upload handling would need to be added here for CVs
        // For now we just save the text data
        await prisma.careerApplication.create({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
                position: validatedFields.data.position || "Genel Başvuru",
                message: validatedFields.data.message || "",
            },
        })
        return { success: true }
    } catch (error) {
        console.error("Career form error:", error)
        return { error: "Bir hata oluştu." }
    }
}
