"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { redirect } from "next/navigation";
// import getAuth from "@/app/components/localStorage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Users from "./users/page";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  return (
    <>
      <Users />
    </>
  );
}
