"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all FAQs
export async function getAllFAQs() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, faqs };
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return { success: false, error: "Bir hata oluştu." };
    }
}

// Get active FAQs for frontend
export async function getActiveFAQs() {
    try {
        const faqs = await prisma.fAQ.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
        return { success: true, faqs };
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return { success: false, error: "Bir hata oluştu." };
    }
}

// Create FAQ
export async function createFAQ(formData: FormData) {
    try {
        const questionTr = formData.get("questionTr") as string;
        const questionEn = formData.get("questionEn") as string;
        const answerTr = formData.get("answerTr") as string;
        const answerEn = formData.get("answerEn") as string;
        const order = parseInt(formData.get("order") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        await prisma.fAQ.create({
            data: {
                question: { tr: questionTr, en: questionEn || questionTr },
                answer: { tr: answerTr, en: answerEn || answerTr },
                order,
                isActive,
            },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, error: "SSS oluşturulamadı." };
    }
}

// Update FAQ
export async function updateFAQ(id: string, formData: FormData) {
    try {
        const questionTr = formData.get("questionTr") as string;
        const questionEn = formData.get("questionEn") as string;
        const answerTr = formData.get("answerTr") as string;
        const answerEn = formData.get("answerEn") as string;
        const order = parseInt(formData.get("order") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        await prisma.fAQ.update({
            where: { id },
            data: {
                question: { tr: questionTr, en: questionEn || questionTr },
                answer: { tr: answerTr, en: answerEn || answerTr },
                order,
                isActive,
            },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return { success: false, error: "SSS güncellenemedi." };
    }
}

// Delete FAQ
export async function deleteFAQ(id: string) {
    try {
        await prisma.fAQ.delete({
            where: { id },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return { success: false, error: "SSS silinemedi." };
    }
}

// Toggle FAQ status
export async function toggleFAQStatus(id: string) {
    try {
        const faq = await prisma.fAQ.findUnique({ where: { id } });
        if (!faq) return { success: false, error: "SSS bulunamadı." };

        await prisma.fAQ.update({
            where: { id },
            data: { isActive: !faq.isActive },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error toggling FAQ status:", error);
        return { success: false, error: "Durum değiştirilemedi." };
    }
}
