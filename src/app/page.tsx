"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { redirect } from "next/navigation";
import Users from "@/app/users/page";
// import getAuth from "@/app/components/localStorage";
import ProtectedRoute from "@/components/ProtectedRoute";

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
