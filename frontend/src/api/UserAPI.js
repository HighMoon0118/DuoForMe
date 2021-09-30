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
function getId() {
  return axiosService.get("users/me", {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function getUserInfo(id) {
  return axiosService.get(`users/${id}`)
}
function receiveRiot(lolNickname) {
  return axiosService.get(`riotuser/receivedata/${lolNickname}`)
}
function getBlacklist() {
  return axiosService.get("blacklist", {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function deleteBlacklist(data) {
  return axiosService.delete("blacklist", {data, headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function getMatchinghistory() {
  return axiosService.get("matchinghistory", {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}

export {checkEmail, checkNickname, signup, login, getId, getUserInfo, receiveRiot, getBlacklist, deleteBlacklist, getMatchinghistory}


