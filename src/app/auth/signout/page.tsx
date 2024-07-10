"use client";
import React, { useEffect } from "react";

import { redirect } from "next/navigation";

const SignOut = () => {
  useEffect(() => {
    window.localStorage.removeItem("user"); redirect("/auth/signin");}, []);
  

 
  return <></>;
};

export default SignOut;
