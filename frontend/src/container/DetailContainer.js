import Detail from "../detail/Detail"
import { connect } from "react-redux"
import { setRUser, setGameData} from "../modules/rUserInfo"
function DetailContainer ({ match, history, rUserInfo, setRUser, setGameData}) {
  return (
    <Detail 
    match={match}
    history={history}
    rUserInfo={rUserInfo}
    setRUser={setRUser}
    setGameData={setGameData}
    />
  )
}

function mapStateToProps (state) {
  return {
    rUserInfo: {
      rUser: state.rUserInfo.rUser,
      gameData: state.rUserInfo.gameData,
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setRUser: (data) => {
      dispatch(setRUser(data))
    },
    setGameData: (data) => {
      dispatch(setGameData(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)