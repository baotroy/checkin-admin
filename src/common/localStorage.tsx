import { AuthUser } from "./type";

const getAuth = (): AuthUser | null => {
  const auth = localStorage.getItem("user");
  if (auth) {
    return JSON.parse(auth) as AuthUser;
  }
  return null;
};

export default getAuth;
