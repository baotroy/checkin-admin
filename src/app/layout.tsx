"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/globals.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import ToasterContext from "./context/ToasterContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import getAuth from "./components/localStorage";
import SignIn from "./auth/signin/page";
import router from "next/router";
import { redirect, usePathname } from "next/navigation";
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
  const currentUser = getAuth();
  const pathname = usePathname();
  console.log("🚀 ~ pathname:", pathname);
  console.log("🚀 ~ currentUser:", currentUser);
  if (!currentUser && pathname !== "/auth/signin") {
    console.log("redirecting to signin");
    // redirect("/auth/signin");
  }
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <ProtectedRoute> */}
          <ToasterContext />

          <DefaultLayout>{children}</DefaultLayout>
          {/* {!currentUser && <SignIn />} */}

          {/* </ProtectedRoute> */}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
