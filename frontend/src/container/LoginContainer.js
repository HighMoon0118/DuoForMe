import Login from "../user/Login"
import { connect } from "react-redux"
import { getUserInfo, blacklist, getMatching } from "../modules/userInfo"
function LoginContainer ({getUserInfo, blacklist, history, getMatching}) {
  return (
    <Login getUserInfo={getUserInfo} blacklist={blacklist} history={history} getMatching={getMatching}/>
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
    },
    getMatching: (matching) => {
      dispatch(getMatching(matching))
    }
  }
}
export default connect(null, mapDispatchToProps)(LoginContainer)