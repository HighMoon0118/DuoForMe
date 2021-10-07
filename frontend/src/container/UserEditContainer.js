import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
import { lolEdit, serviceEdit, blacklist} from "../modules/userInfo"
function UserEditContainer ({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, userId, blacklist, history }) {
  return (
    <UserEdit 
      lolNickname={lolNickname} 
      serviceNickname={serviceNickname} 
      blackList={blackList} 
      email={email} 
      lolEdit={lolEdit} 
      serviceEdit={serviceEdit} 
      blacklist={blacklist}
      userId={userId}
      history={history}
    />
  )
}

function mapStateToProps (state) {
  return {
    lolNickname: state.userInfo.lolNickname,
    serviceNickname: state.userInfo.serviceNickname,
    blackList: state.userInfo.blackList,
    email: state.userInfo.email,
    userId: state.userInfo.userId
  }
}
function mapDispatchToProps(dispatch) {
  return {
    lolEdit: (lolNickname) => {
      dispatch(lolEdit(lolNickname))
    },
    serviceEdit: (serviceNickname) => {
      dispatch(serviceEdit(serviceNickname))
    },
    blacklist: (blackList) => {
      dispatch(blacklist(blackList))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)