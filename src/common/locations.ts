import { IProvince } from "@/app/types";
import request from "./api"

const getProvinces = (): Promise<IProvince[]> => {
    return request("/location/provinces", "GET").then((res) => {
        return res.data.items as IProvince[];
    }).catch((err) => [])
}
export default getProvinces;