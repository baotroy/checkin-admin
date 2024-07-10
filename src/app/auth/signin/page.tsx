"use client";
import getAuth from "@/app/components/localStorage";
// import Image from "next/image";
import AuthForm from "./AuthForm";
import { useEffect, useState } from "react";

export default function SignIn() {
  // const [auth, setAuth] = useState(getAuth());
  // useEffect(() => {
  //   if (auth) {
  //     console.log("Authenticated");
  //     window.location.href = "/users";
  //   }
  // }, [auth]);

  return (
    <div
      className="
                bg-gray-100
                flex
                min-h-full
                flex-col
                justify-center
                py-12
                sm:px-6
                lg:px-8"
    >
      <div>
        <h2
          className="
          text-gray-900
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
        "
        >
          Sign in
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
