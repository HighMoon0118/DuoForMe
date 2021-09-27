import Sidebar from "../detail/sidebar/Sidebar"
import { connect } from "react-redux"
import { changeMatching } from "../modules/matching"
import { myLine, yourLine } from "../modules/selectLine"
function SidebarContainer ({time, me, you, isMatching, changeMatching, myLine, yourLine}) {
  return (
    <Sidebar time={Math.floor((new Date().getTime() - new Date(time))/ 1000)} me={me} you={you} 
    isMatching={isMatching} changeMatching={changeMatching} myLine={myLine} yourLine={yourLine}/>
  )
}

function mapStateToProps (state) {
  return {
    time: state.matching.time,
    me: state.selectLine.me,
    you: state.selectLine.you,
    isMatching: state.matching.isMatching
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
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)