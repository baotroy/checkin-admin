import { AuthUserType } from "@/app/types";

const getAuth = (): AuthUserType | null => {
  try {
    const auth = localStorage.getItem("user");
    if (auth) {
      return JSON.parse(auth) as AuthUserType;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getAuth;
