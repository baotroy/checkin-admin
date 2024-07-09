import { AuthUser } from "./type";

const getAuth = (): AuthUser | null => {
  try {
    const auth = localStorage.getItem("user");
    if (auth) {
      return JSON.parse(auth) as AuthUser;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getAuth;
