import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
import { lolEdit, serviceEdit, blackListEdit} from "../modules/userInfo"
function UserEditContainer ({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blackListEdit, userId }) {
  return (
    <UserEdit 
      lolNickname={lolNickname} 
      serviceNickname={serviceNickname} 
      blackList={blackList} 
      email={email} 
      lolEdit={lolEdit} 
      serviceEdit={serviceEdit} 
      blackListEdit={blackListEdit}
      userId={userId}
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
      // console.log(lolNickname)
      dispatch(lolEdit(lolNickname))
    },
    serviceEdit: (serviceNickname) => {
      dispatch(serviceEdit(serviceNickname))
    },
    blackListEdit: (blackList) => {
      console.log(blackList)
      dispatch(blackListEdit(blackList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)