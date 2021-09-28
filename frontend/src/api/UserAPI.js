import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

function signup(data) {
  return axiosService.post("auth/signup", data)
}

function login(data) {
  return axiosService.post("auth/login", data)
}

export {signup, login}