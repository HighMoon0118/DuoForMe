import Sidebar from "../detail/sidebar/Sidebar"
import { connect } from "react-redux"

function SidebarContainer ({time}) {
  return (
    <Sidebar time={ time }/>
  )
}

function mapStateToProps (state) {
  return {
    time: state.matching.time
  }
}
export default connect(mapStateToProps)(SidebarContainer)