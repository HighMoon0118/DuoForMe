import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})


function receiveRiot(lolNickname) {
  return axiosService.get(`riotuser/receivedata/${lolNickname}`)
}
function getGameData(lolNickname) {
  return axiosService.get(`riotuser/search/${lolNickname}`)
}
function getRUserInfo(lolNickname) {
  return axiosService.get(`riotuser/riotuserinfo/${lolNickname}`)
}

export {
  receiveRiot, getGameData, getRUserInfo}
