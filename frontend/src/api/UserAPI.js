import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})


function login(data) {
  return axiosService.post("login", data)
}

export {login}