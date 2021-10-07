import axios from "axios"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

function lolNicknameEditAPI(userId, lolNickname) {
  return axiosService.put(`users/lolnickname/${userId}`, lolNickname, {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}

function getLolNicknameCount(nickname) {
return axiosService.get(`users/nicknamecount/${nickname}`)
}
  
function matchingCreditAdd(historyId, credit) {
  return axiosService.put(`matchinghistory/credit/${historyId}`, credit, {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function blacklistAdd(blackUserId) {
  return axiosService.post("blacklist", blackUserId, {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function passwordChange(userId, data) {
  return axiosService.put(`users/password/${userId}`, data, {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
export {lolNicknameEditAPI, getLolNicknameCount, matchingCreditAdd, blacklistAdd, passwordChange}