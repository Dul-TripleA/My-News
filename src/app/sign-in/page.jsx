import SignInButtons from "@/components/signInButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignInButtons />
    </div>
  );
};
export default SignIn;
