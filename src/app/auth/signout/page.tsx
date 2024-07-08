"use client";
import React from "react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const SignOut: React.FC = () => {
  localStorage.removeItem("user");

  redirect("/auth/signin");
  return <></>;
};

export default SignOut;
