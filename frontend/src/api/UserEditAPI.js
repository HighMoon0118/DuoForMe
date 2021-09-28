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
  

export {lolNicknameEditAPI, getLolNicknameCount}