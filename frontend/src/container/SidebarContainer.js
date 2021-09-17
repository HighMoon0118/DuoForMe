import Sidebar from "../detail/sidebar/Sidebar"
import { connect } from "react-redux"

function SidebarContainer ({time, me, you}) {
  return (
    <Sidebar time={time} me={me} you={you}/>
  )
}

function mapStateToProps (state) {
  return {
    time: state.matching.time,
    me: state.selectLine.me,
    you: state.selectLine.you
  }
}
export default connect(mapStateToProps)(SidebarContainer)