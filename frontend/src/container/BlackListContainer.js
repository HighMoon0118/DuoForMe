import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
import {blackListEdit} from "../modules/userInfoEdit"
function UserEditContainer ({ blackList, blackListEdit }) {
  return (
    <UserEdit blackList={blackList} blackListEdit={blackListEdit}/>
  )
}

function mapStateToProps (state) {
  return {
    blackList: state.userInfoEdit.blackList,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    blackListEdit: (blackList) => {
      console.log(blackList)
      dispatch(blackListEdit(blackList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)