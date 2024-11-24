/* "use client";
import { z } from "zod"
import { signUpFormSchema } from "../../sign-up/schema"
import { AppType } from "@/hono-api/src";
import { hc } from "hono/client";



const client = hc<AppType>("http://localhost:3002");

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export async function postSignUp(values: SignUpFormValues) {
    try {
      // Send the form values as JSON
      const response = await client["sign-up"].$post({
        json: values,
      });
  
      return response; // Return the response for further handling
    } catch (error) {
        if (error instanceof Error && error.message.includes("409")) {
            throw new Error("The email or username is already registered. Please try another.");
          }
          throw new Error("Failed to sign up. Please try again.");
        }
    }
  
 */
"use client";

import { z } from "zod";
import { signUpFormSchema } from "../../sign-up/schema";
import { AppType } from "@/hono-api/src";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:3002");

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export async function postSignUp(values: SignUpFormValues) {
  try {
    const response = await client["sign-up"].$post({
      json: values,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("409")) {
      throw new Error("The email or username is already registered. Please try another.");
    }
    throw new Error("Failed to sign up. Please try again.");
  }
}

