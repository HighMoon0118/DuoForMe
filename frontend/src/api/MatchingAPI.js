import axios from "axios"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2MzI3MTU4MjAsImV4cCI6MTYzMjcxNzYyMH0.IuQYpUnZ4LaRmMBD0GCl1_25IMA_Rc-rp8b3iFm51JvyF3EkdnhY0Tg30meQZyCZAx1pNVM1i87Obk7vccgOVg"
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