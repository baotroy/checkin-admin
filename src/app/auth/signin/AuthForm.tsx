"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/inputs/Button";
// import AuthSocialButton from "./AuthSocialButton";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import getAuth from "@/app/components/localStorage";

type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  // const session = useCook();
  // console.log("🚀 ~ AuthForm ~ session:", session);
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(getAuth());

  useEffect(() => {
    if (auth) {
      console.log("Authenticated");
      router.push("/users");
    }
  }, [auth, router]);

  // const toggleVariant = useCallback(() => {
  //   if (variant === "LOGIN") {
  //     setVariant("REGISTER");
  //   } else {
  //     setVariant("LOGIN");
  //     router.push("/users");
  //   }
  // }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // name: "",
      username: "admin",
      password: "admin007",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`, data)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response.data);
        // mutate("user", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // redirect("/");
        setAuth(response.data);
        return response.data;
      })
      .finally(() => {
        setIsLoading(false);
      });
    // if (response) {
    //   const value = localStorage.getItem("user");
    //   console.log(
    //     "🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ value:",
    //     value,
    //   );
    //   router.refresh();
    // }
    // if (variant === "LOGIN") {
    //   signIn("credentials", {
    //     ...data,
    //     redirect: false,
    //   })
    //     .then((callback) => {
    //       console.log(callback);
    //       if (callback?.error) {
    //         toast.error("Invalid username or password");
    //       }

    //       if (callback?.ok && !callback?.error) {
    //         toast.success("Logged in!");
    //       }
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
  };

  // const socialAction = (action: string) => {
  //   setIsLoading(true);

  //   signIn(action, { redirect: false })
  //     .then((callback) => {
  //       if (callback?.error) {
  //         toast.error("Invalid username or password");
  //       }

  //       if (callback?.ok && !callback?.error) {
  //         toast.success("Logged in!");
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )} */}

          <Input
            label="username"
            id="username"
            type="username"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} label="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
