"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/globals.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
// import ToasterContext from "./context/ToasterContext";
// import useSWR from "swr";
// import { redirect } from "next/navigation";
// import AuthContext from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
