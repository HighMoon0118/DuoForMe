import axios from "axios"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2MzI3MTA2OTgsImV4cCI6MTYzMjcxMjQ5OH0.vh8cuY67Y8y2bZ2qW3JH95442rooZ7Ahyt9SzPGmPw19dwhYWD0JPr76vXOiTnh9oxAtsgBcj-5rl69YQjqTeQ"
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: "Bearer " + token
  }
})

function requestMatching(position) {
  return axiosService.post("matching", position)
}
function cancelMatching() {
  return axiosService.delete("matching")
}
export {requestMatching, cancelMatching}