import { getMatching, blacklist } from "../modules/userInfo"
import { connect } from "react-redux"
import Modal from "../detail/sidebar/Modal"
function CreditModalContainer({getMatching, open, close, matchinghistoryId, userName, userId, blacklist }) {
  return (
    <Modal getMatching={getMatching} open={open} close={close} matchinghistoryId={matchinghistoryId} userName={userName} userId={userId} blacklist={blacklist}></Modal>
  )
}
function mapDispatchToProps(dispatch) {
  return {
    getMatching: (matching) => {
      dispatch(getMatching(matching))
    },
    blacklist: (blackList) => {
      dispatch(blacklist(blackList))
    }
  }
}
export default connect(null, mapDispatchToProps)(CreditModalContainer)