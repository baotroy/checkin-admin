"use client";
import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@/css/globals.css";
import React, { useEffect, useState } from "react";
// import Loader from "@/components/common/Loader";
import ToasterContext from "../context/ToasterContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import getAuth from "../components/localStorage";
import SignIn from "../auth/signin/page";
import { redirect, usePathname, useRouter } from "next/navigation";
// import useSWR from "swr";
// import { redirect } from "next/navigation";
// import AuthContext from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(getAuth());
  // const currentUser = getAuth();
  // const pathname = usePathname();
  // console.log("🚀 ~ pathname:", pathname);
  // console.log("🚀 ~ currentUser:", currentUser);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!currentUser && pathname !== "/auth/signin") {
  //     console.log("redirecting to signin");
  //     router.push("/auth/signin");
  //   }
  // }, [currentUser, pathname, router]);
  useEffect(() => {

    if (!currentUser) {
      console.log("redirecting to signin");
      redirect("/auth/signin");
    }
  } , [currentUser]);
  // if (!currentUser) {
  //   console.log("redirecting to signin");
  //   window.location.href = "/auth/signin";
  // }
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <ProtectedRoute> */}
          {/* <Loader /> */}
          <ToasterContext />
          {currentUser ? <DefaultLayout>{children}</DefaultLayout> : <SignIn />}
          {/* <DefaultLayout>{children}</DefaultLayout> */}
          {/* {!currentUser && <SignIn />} */}

          {/* </ProtectedRoute> */}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
