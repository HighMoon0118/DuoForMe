import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
import { lolEdit, serviceEdit, blackListEdit} from "../modules/userInfoEdit"
function UserEditContainer ({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blackListEdit }) {
  return (
    <UserEdit lolNickname={lolNickname} serviceNickname={serviceNickname} blackList={blackList} email={email} lolEdit={lolEdit} serviceEdit={serviceEdit} blackListEdit={blackListEdit}/>
  )
}

function mapStateToProps (state) {
  return {
    lolNickname: state.userInfoEdit.lolNickname,
    serviceNickname: state.userInfoEdit.serviceNickname,
    blackList: state.userInfoEdit.blackList,
    email: state.userInfoEdit.email,
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