import React from "react";
interface FormErrorMessageProps {
  errors: any;
  fieldName: string;
}
const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ errors, fieldName }: FormErrorMessageProps) => {
  if (!errors) return <></>;
  if (errors[fieldName] && errors[fieldName].message) {
    return <div className="error text-xs mt-1">{errors[fieldName].message}</div>
  }
   return <></>
}

export default FormErrorMessage;


// export default function FormErrorMessage({ children }: { children: React.ReactNode }) {
//   return <div className="error text-xs mt-1">{children}</div>;
// }