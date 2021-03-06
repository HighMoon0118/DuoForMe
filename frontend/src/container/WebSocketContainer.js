import WebSocket from "../WebSocket"
import { connect } from "react-redux"
import { changeMatching, matched, chatting, setDuo, setFolded, setChatable } from "../modules/matching"
import { getMatching } from "../modules/userInfo"
import { myLine, yourLine } from "../modules/selectLine"
function WebSocketContainer ({ isLogin, userId, lolNickname, isMatching, isMatched, canChat, chat, duoName, duoId, isFolded,
                              changeMatching, matched, chatting, setDuo, setFolded, setChatable, getMatching }) {
  return (
    <WebSocket 
      isLogin={isLogin} 
      userId={userId}
      lolNickname={lolNickname}
      isMatching={isMatching}
      isMatched={isMatched}
      duoName={duoName}
      duoId={duoId}
      isFolded={isFolded}
      canChat={canChat}
      chat={chat}
      changeMatching={changeMatching} 
      matched={matched}
      chatting={chatting}
      setDuo={setDuo}
      setFolded={setFolded}
      setChatable={setChatable}
      getMatching={getMatching}
    />
  )
}

function mapStateToProps (state) {
  return {
    isLogin: state.userInfo.isLogin,
    userId: state.userInfo.userId,
    lolNickname: state.userInfo.lolNickname,
    isMatching: state.matching.isMatching,
    isMatched: state.matching.isMatched,
    isFolded: state.matching.isFolded,
    canChat: state.matching.canChat,
    chat: state.matching.chat,
    duoName: state.matching.duoName,
    duoId: state.matching.duoId
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeMatching: (isMatching, time) => {
      if (isMatching) {
        dispatch(myLine("default"))
        dispatch(yourLine("default"))
      }
      dispatch(changeMatching(isMatching, time))
    },
    matched: (isMatched) => {
      dispatch(matched(isMatched))
    },
    chatting: (chat) => {
      dispatch(chatting(chat))
    },
    setDuo: (duoName, duoId) => {
      dispatch(setDuo(duoName, duoId))
    },
    setFolded: (isFolded) => {
      dispatch(setFolded(isFolded))
    },
    setChatable: (canChat) => {
      dispatch(setChatable(canChat))
    },
    getMatching: (data) => {
      dispatch(getMatching(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketContainer)