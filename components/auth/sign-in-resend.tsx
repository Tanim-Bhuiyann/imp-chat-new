"use server"

import { signIn } from "@/auth"

export async function resendSignIn(formData: FormData) {
  await signIn("resend", formData)
}