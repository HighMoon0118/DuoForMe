import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

function checkEmail(email) {
  return axiosService.get(`users/email?email=${email}`)
}

function checkNickname(nickname) {
  return axiosService.get(`users/serviceNickname?serviceNickname=${nickname}`)
}

function signup(data) {
  return axiosService.post("auth/signup", data)
}

function login(data) {
  return axiosService.post("auth/login", data)
}


export {checkEmail, checkNickname, signup, login}