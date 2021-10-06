const CHANGE_MATCHING = "matching/CHANGE_MATCHING"
const MATCHED = "matching/MATCHED"
const CHATTING = "matching/CHATTING"
const SETDUO = "matching/SETDUO"
const SETFOLDED = "matching/SETFOLDED"
const SETCHATABLE = "matching/SETCHATABLE"

export const changeMatching = ( isMatching, time ) => ({
  type: CHANGE_MATCHING,
  isMatching,
  time
})

export const matched = ( isMatched ) => ({
  type: MATCHED,
  isMatched,
})

export const chatting = ( chat ) => ({
  type: CHATTING,
  chat,
})

export const setDuo = ( duoName, duoId ) => ({
  type: SETDUO,
  duoName: duoName,
  duoId: duoId
})

export const setFolded = ( isFolded ) => ({
  type: SETFOLDED,
  isFolded: isFolded,
})

export const setChatable = ( canChat ) => ({
  type: SETCHATABLE,
  canChat: canChat,
})

const initialState = {
  isMatching: false,
  time: undefined,
  isMatched: false,
  canChat: false,
  chat: [],
  duoName: "",
  duoId: null,
  isFolded: false,
}
function matching(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MATCHING:
      return {
        ...state,
        isMatching: !action.isMatching,
        time: action.time
      }
    case MATCHED:
      return {
        ...state,
        isMatched: action.isMatched,
      }
    case CHATTING:
      return {
        ...state,
        chat: action.chat,
      }
    case SETDUO:
      return {
        ...state,
        duoName: action.duoName,
        duoId: action.duoId,
      }
    case SETFOLDED:
      return {
        ...state,
        isFolded: action.isFolded
      }
    case SETCHATABLE:
      return {
        ...state,
        canChat: action.canChat
      }
    default:
      return state
  }
}
export default matching