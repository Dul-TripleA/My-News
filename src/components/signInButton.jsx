"use client"

import Image from "next/image";
import { signIn } from "next-auth/react";

const SignInButtons = () => {
  return (
    <>
      <h1 className="text-center mt-8">Sign In</h1>
      <div className="flex flex-col gap-4 mt-4 p-4 items-center justify-center">
        <button
          onClick={() => signIn("github")}
          className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition"
        >
          <span>
            <Image
              src={"/github.svg"}
              width={30}
              height={30}
              alt="github-logo"
            />
          </span>
          Sign In with Github
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition"
        >
          <span>
            <Image
              src={"/google.svg"}
              width={30}
              height={30}
              alt="google-logo"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
};
export default SignInButtons;
