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
/* "use client";

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

    // Successful signup response
    return {
      success: true,
      message: "Sign up successful! Welcome, " + values.username,
    };
  } catch (error) {
    // Handle HTTP 409 Conflict specifically
    if (error instanceof Response && error.status === 409) {
      const errorData = await error.json(); // Parse backend error response
      return {
        success: false,
        message: errorData.message || "Email already in use.",
      };
    }

    // Handle other errors
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
    
    // Check if the response is ok before considering it successful
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Failed to sign up. Please try again.",
      };
    }

    // Successful signup response
    return {
      success: true,
      message: "Sign up successful! Welcome, " + values.username,
    };
  } catch (error: any) {
    // Check if the error has response data (for HTTP errors)
    if (error.response) {
      try {
        const errorData = await error.response.json();
        
        // Handle 409 Conflict
        if (error.response.status === 409) {
          return {
            success: false,
            message: errorData.message || "Email already in use.",
          };
        }
        if (error.response.status === 400) {
          // Check if we have validation errors
        
            // Get the first validation error message
           
            return {
              success: false,
              message: errorData.message || "Fix password.",
            };
          }
          
        
        
      } catch (parseError) {
        // Handle case where error response isn't valid JSON
        console.error("Error parsing error response:", parseError);
      }
    }

    // Generic error handling
    console.error("Sign up error:", error);
    return {
      success: false,
      message: "Failed to sign up. Please try again.",
    };
  }
}

