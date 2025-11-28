import axios from "axios";
import { baseURL } from "./constant";

// Note : token cookie me hoga to localStorage me save karne ki requirement nhi hoti hai

const API = axios.create(
    {
        baseURL: baseURL,
        timeout: 10000,
        withCredentials: true
    }
);

export default API;