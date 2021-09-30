import Login from "../user/Login"
import { connect } from "react-redux"
import { getUserInfo, blacklist } from "../modules/userInfo"
function LoginContainer ({getUserInfo, blacklist, history}) {
  return (
    <Login getUserInfo={getUserInfo} blacklist={blacklist} history={history} />
  )
}
function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (data) => {
      console.log("login")
      dispatch(getUserInfo(data))
    },
    blacklist: (blackList) => {
      dispatch(blacklist(blackList))
    }
  }
}
export default connect(null, mapDispatchToProps)(LoginContainer)