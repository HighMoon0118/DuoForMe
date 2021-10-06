const SET_RUSER = "matchUser/SET_RUSER_INFO"
const SET_GAME_DATA = "matchUser/SET_GAME_DATA"

export const setRUser = ( rUser ) => ({
  type: SET_RUSER,
  rUser
})
export const setGameData = ( gameData ) => ({
  type: SET_GAME_DATA,
  gameData
})
const initialState = {
  rUser: {},
  gameData: []
}
function matchUser(state = initialState, action) {
  switch (action.type) {
    case SET_RUSER:
      return {
        ...state,
        rUser: action.rUser
      }
    case SET_GAME_DATA:
      return {
        ...state,
        gameData: action.gameData
      }
    default: 
      return state
  }
}
export default matchUser