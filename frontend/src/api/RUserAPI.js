import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})


function receiveRiot(lolNickname) {
  return axiosService.get(`riotuser/receivesummonerdata/${lolNickname}`)
}
function getGameData(lolNickname) {
  return axiosService.get(`riotuser/summonersearch/${lolNickname}`)
}
function getRUserInfo(lolNickname) {
  return axiosService.get(`riotuser/riotuserinfo/${lolNickname}`)
}

export {
  receiveRiot, getGameData, getRUserInfo}
