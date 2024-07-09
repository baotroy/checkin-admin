import axios, { Method } from "axios";
import getAuth from "../app/components/localStorage";
import { useRouter } from "next/router";
const request = async (path: string, method: Method, data?: any): Promise<any> => {
  const auth = getAuth();
  const headers: { authorization?: string } = {};
  if (auth) {
    headers.authorization = `Bearer ${auth.accesstoken}`;
  }
  const uri = `${process.env.NEXT_PUBLIC_API_URI}${path}`;
try {
  return await axios({ url: uri, method: method, headers, data });
} catch (error: any) {
  console.log("error", error.response.status);
  if (error.response.status === 401) {
    localStorage.removeItem("user");
    const router = useRouter();
    console.log("hh")

    return router.push("/auth/signout");
  }
  console.log("error", error);
  return error;  
}
};
export default request;
