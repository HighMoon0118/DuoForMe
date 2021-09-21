import Sidebar from "../detail/sidebar/Sidebar"
import { connect } from "react-redux"

function SidebarContainer ({time, me, you}) {
  return (
    <Sidebar time={Math.floor((new Date().getTime() - new Date(time))/ 1000)} me={me} you={you}/>
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