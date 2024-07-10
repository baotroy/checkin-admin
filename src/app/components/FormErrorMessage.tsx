import React from "react";

export default function FormErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="error text-xs mt-1">{children}</div>;
}