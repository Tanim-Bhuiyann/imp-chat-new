import { mockSignIn } from "./mock";

export async function signIn(email: string, password: string) {
  if (process.env.NODE_ENV === "development") {
    return mockSignIn(email, password);
  }

  // TODO: Implement real sign in
  throw new Error("Real sign in is not implemented");
}
