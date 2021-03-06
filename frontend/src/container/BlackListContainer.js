import UserEdit from "../user/UserEdit"
import { connect } from "react-redux"
import {blackListEdit} from "../modules/userInfo"
function UserEditContainer ({ blackList, blackListEdit }) {
  return (
    <UserEdit blackList={blackList} blackListEdit={blackListEdit}/>
  )
}

function mapStateToProps (state) {
  return {
    blackList: state.userInfo.blackList,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    blackListEdit: (blackList) => {
      dispatch(blackListEdit(blackList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)