import MatchingModal from "../MatchingModal"
import { connect } from "react-redux"
import { setFolded } from "../modules/matching"
import { setRUser, setGameData} from "../modules/matchUser"
function MatchUserContainer ({ isMatched, duoName, sendMsg, accpetOrRefuse, exitMatching, isFolded, setFolded, 
                              canChat, chat, rUser, gameData, setRUser, setGameData, lolNickname}) {
  return (
    <MatchingModal 
    lolNickname={lolNickname}
    isMatched={isMatched}
    duoName={duoName}
    sendMsg={sendMsg}
    accpetOrRefuse={accpetOrRefuse}
    exitMatching={exitMatching}
    isFolded={isFolded}
    setFolded={setFolded}
    canChat={canChat}
    chat={chat}
    rUser={rUser}
    gameData={gameData}
    setRUser={setRUser}
    setGameData={setGameData}
    />
  )
}

function mapStateToProps (state) {
  return {
    lolNickname: state.userInfo.lolNickname,
    isMatched: state.matching.isMatched,
    canChat: state.matching.canChat,
    chat: state.matching.chat,
    duoName: state.matching.duoName,
    isFolded: state.matching.isFolded,
    rUser: state.matchUser.rUser,
    gameData: state.matchUser.gameData,

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
    setFolded: (data) => {
      dispatch(setFolded(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchUserContainer)