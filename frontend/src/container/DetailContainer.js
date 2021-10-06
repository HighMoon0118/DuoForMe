import Detail from "../detail/Detail"
import { connect } from "react-redux"
import { setRUser, setGameData} from "../modules/rUserInfo"
function DetailContainer ({ match, history, rUser, gameData, setRUser, setGameData}) {
  return (
    <Detail 
    match={match}
    history={history}
    rUser={rUser}
    gameData={gameData}
    setRUser={setRUser}
    setGameData={setGameData}
    />
  )
}

function mapStateToProps (state) {
  return {
    rUser: state.rUserInfo.rUser,
    gameData: state.rUserInfo.gameData,
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