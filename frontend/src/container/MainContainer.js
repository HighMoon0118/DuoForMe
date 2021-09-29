import Main from "../main/Main"
import { connect } from "react-redux"
import { logout } from "../modules/userInfo"
import { changeMatching } from "../modules/matching"
function MainContainer ({isLogin, logout, history, isMatching}) {
  return (
    <Main isLogin={isLogin} logout={logout} history={history} isMatching={isMatching}/>
  )
}

function mapStateToProps (state) {
  return {
    isLogin: state.userInfo.isLogin,
    isMatching: state.matching.isMatching
  }
}
function mapDispatchToProps (dispatch) {
  return {
    logout: () => {
      dispatch(logout())
      dispatch(changeMatching(true, null))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)