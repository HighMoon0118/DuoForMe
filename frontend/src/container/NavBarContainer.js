import NavBar from "../detail/NavBar"
import { connect } from "react-redux"
import { logout } from "../modules/userInfo"
function NavBarContainer ({isLogin, history, logout}) {
  return (
    <NavBar isLogin={isLogin} logout={logout} history={history}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)