import { z } from "zod";
import { signUpFormSchema } from "./schema";

type SignUpResponse = {
  success: boolean;
  message: string;
};

export const mockSignUp = async (
  values: z.infer<typeof signUpFormSchema>
): Promise<SignUpResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate basic validation
  if (values.password !== values.confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  // Simulate email already in use
  if (values.email === "existing@example.com") {
    return {
      success: false,
      message: "Email already in use.",
    };
  }

  // Simulate successful signup
  return {
    success: true,
    message: "Sign up successful! Welcome, " + values.username,
  };
};