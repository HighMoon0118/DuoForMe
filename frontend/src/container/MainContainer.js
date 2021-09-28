import Main from "../main/Main"
import { connect } from "react-redux"
import { logout } from "../modules/userInfo"
function MainContainer ({isLogin, logout, history}) {
  return (
    <Main isLogin={isLogin} logout={logout} history={history}/>
  )
}

function mapStateToProps (state) {
  return {
    isLogin: state.userInfo.isLogin,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)