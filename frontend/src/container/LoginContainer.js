import Login from "../user/Login"
import { connect } from "react-redux"
import { getUserInfo } from "../modules/userInfo"

function LoginContainer ({getUserInfo, history}) {
  return (
    <Login getUserInfo={getUserInfo} history={history} />
  )
}
function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (data) => {
      console.log("login")
      dispatch(getUserInfo(data))
    }
  }
}
export default connect(null, mapDispatchToProps)(LoginContainer)