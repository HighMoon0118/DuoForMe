import axios from "axios"

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

function requestMatching(position) {
  return axiosService.post("matching", position, {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
function cancelMatching() {
  return axiosService.delete("matching",  {headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }})
}
export {requestMatching, cancelMatching}