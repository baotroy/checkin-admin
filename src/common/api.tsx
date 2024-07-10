import axios, { Method } from "axios";
import getAuth from "../app/components/localStorage";
import { useRouter } from "next/router";
const request = async (
  path: string,
  method: Method,
  data?: any,
): Promise<any> => {
  const auth = getAuth();
  const headers: { authorization?: string } = {};
  if (auth) {
    headers.authorization = `Bearer ${auth.accesstoken}`;
  }
  const uri = `${process.env.NEXT_PUBLIC_API_URI}${path}`;
  try {
    return await axios({ url: uri, method: method, headers, data });
  } catch (error: any) {
    return error;
  }
};
export default request;
