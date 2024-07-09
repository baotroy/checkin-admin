"use client";
// import Image from "next/image";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";
import useSWR from "swr";
export default function SignIn() {
  // const { data: currentUser } = useSWR("user", (key) => {
  //   const value = localStorage.getItem(key);
  //   return !!value ? JSON.parse(value) : undefined;
  // });
  // // localStorage.getItem("userSession");
  // if (currentUser) {
  //   redirect("/");
  // }
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
        {/* <Image
          alt="logo"
          height="48"
          width="48"
          src="/images/logo.jpeg"
          className="mx-auto w-auto"
        /> */}
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
