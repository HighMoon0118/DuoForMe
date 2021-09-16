import MaingMatching from "../main/MainMatching"
import { connect } from "react-redux"
import { changeMatching } from "../modules/matching"

function MainMatchingContainer ({isMatching, changeMatching, time}) {
  return (
    <MaingMatching isMatching={ isMatching } changeMatching={ changeMatching } time={ time }/>
  )
}
function mapStateToProps(state) {
  return {
    isMatching: state.matching.isMatching,
    time: state.matching.time
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeMatching: (isMatching, time) => {
      dispatch(changeMatching(isMatching, time))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMatchingContainer)