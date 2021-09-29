import WebSocket from "../WebSocket"
import { connect } from "react-redux"

function UserEditContainer ({ isLogin, userId }) {
  return (
    <WebSocket 
      isLogin={isLogin} 
      userId={userId}
    />
  )
}

function mapStateToProps (state) {
  return {
    isLogin: state.userInfo.isLogin,
    userId: state.userInfo.userId
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)