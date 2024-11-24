export async function mockSignIn(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    if (email === "test@example.com" && password === "correctpassword") {
      return { success: true, message: "Sign in successful" };
    }
  
    if (email === "test@example.com") {
      return { success: false, message: "Incorrect password" };
    }
  
    if (email.length !== 0) {
      return { success: false, message: "User not found" };
    }
  
    throw new Error("Unknown error");
  }
  