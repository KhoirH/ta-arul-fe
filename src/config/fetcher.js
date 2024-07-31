import axios from "axios";

export const fetcher = axios.create({
  baseURL: "http://localhost:8000"
})
export const fetcherWithAuth = (token) => axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
