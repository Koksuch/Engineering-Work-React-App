import axios from "axios"
import { baseUrls } from "../utils/enums"

export const authApiInstance = axios.create({
  baseURL: `${baseUrls.http}/api/auth`,
  withCredentials: true,
})
