import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
<<<<<<< HEAD
import { lolEdit, serviceEdit, blacklist} from "../modules/userInfo"
function UserEditContainer ({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, userId, blacklist, history }) {
=======
import { lolEdit, serviceEdit, blackListEdit} from "../modules/userInfo"
function UserEditContainer ({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blackListEdit, userId }) {
>>>>>>> d51bb06fcd95c0629ace4948656d2f6ac35393ca
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
      // console.log(lolNickname)
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