"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  // Perform server-side logic for Google Sign-In
  await signIn("google");
}

