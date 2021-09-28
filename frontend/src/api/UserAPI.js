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
function getId() {
  return axiosService.get("/users/me", {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function getUserInfo(id) {
  return axiosService.get(`/users/${id}`)
}
export {signup, login, getId, getUserInfo}