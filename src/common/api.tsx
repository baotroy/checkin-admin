import axios, { Method } from "axios";
import getAuth from "../app/components/localStorage";
const request = (path: string, method: Method): Promise<any> => {
  const auth = getAuth();
  const headers: { authorization?: string } = {};
  if (auth) {
    headers.authorization = `Bearer ${auth.accesstoken}`;
  }
  const uri = `${process.env.NEXT_PUBLIC_API_URI}${path}`;

  return axios({ url: uri, method: method, headers });
};
export default request;
