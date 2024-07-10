"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/globals.css";
import React, { useEffect, useState } from "react";
// import getAuth from "./components/localStorage";
// import { redirect } from "next/navigation";
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
  console.log("adfasdfdsaf");
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
