import axios from "axios"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2MzI3MjY4NzAsImV4cCI6MTYzMjcyODY3MH0.GkF3yfyoFeuOmoNV4KQCB84dO2PXuxEfGv3mRZqd2Xgk8DKjFXXZG2gRq2ofIBQLINAT7VbgMBNdmjoKerufaA"
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