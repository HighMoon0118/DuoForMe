import axios from "axios"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2MzI3OTE1ODIsImV4cCI6MTYzMjc5MzM4Mn0.LLDyE-eAgcIB65PoOfF3c2oJW2VjX2JHvAf59m_GrPDao8SK-BV-NrJMsDCJ0__OlmZfElUQpQ5L0J3Aqdy4yg"
const config = {
  headers: {
      Authorization: "Bearer " + token
    }
}
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

function lolNicknameEditAPI(userId, lolNickname) {
  return axiosService.put(`users/lolnickname/${userId}`, lolNickname, config)
}

function getLolNicknameCount(nickname) {
return axiosService.get(`users/nicknamecount/${nickname}`)
}
  

export {lolNicknameEditAPI, getLolNicknameCount}