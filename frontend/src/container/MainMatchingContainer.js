import MaingMatching from "../main/MainMatching"
import { connect } from "react-redux"
import { changeMatching } from "../modules/matching"
import { myLine, yourLine } from "../modules/selectLine"
function MainMatchingContainer ({isMatching, changeMatching, time, me, you, myLine, yourLine, isLogin, history}) {
  return (
    <MaingMatching isMatching={isMatching} changeMatching={changeMatching} time={Math.floor((new Date().getTime() - new Date(time))/ 1000)} 
    me={me} you={you} myLine={myLine} yourLine={yourLine} isLogin={isLogin} history={history}
    />
  )
}
function mapStateToProps(state) {
  return {
    isMatching: state.matching.isMatching,
    time: state.matching.time,
    me: state.selectLine.me,
    you: state.selectLine.you,
    isLogin: state.userInfo.isLogin
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeMatching: (isMatching, time) => {
      dispatch(changeMatching(isMatching, time))
    },
    myLine: (me) => {
      dispatch(myLine(me))
    },
    yourLine: (you) => {
      dispatch(yourLine(you))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMatchingContainer)