"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";
import Users from "./users/page";
import getAuth from "@/common/localStorage";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  let currentUser = getAuth();
  if (!currentUser) {
    redirect("/auth/signin");
  }
  return (
    <>
      <DefaultLayout>
        <Users />
      </DefaultLayout>
    </>
  );
}
