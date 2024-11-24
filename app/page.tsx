import { SignInForm } from "@/components/feature/sign-in/sign-in";
import { SignUpForm } from "@/components/feature/sign-up/sign-up";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignInForm/>
     {/*  <SignUpForm/> */}
    </div>
  );
}
