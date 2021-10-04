const SET_RUSER = "userInfo/SET_RUSER_INFO"
const SET_GAME_DATA = "userInfo/SET_GAME_DATA"

export const setRUser = ( data ) => ({
  type: SET_RUSER,
  data
})
export const setGameData = ( data ) => ({
  type: SET_GAME_DATA,
  data
})
const initialState = {
  rUser: {},
  gameData: []
}
function rUserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_RUSER:
      return {
        ...state,
        rUser: action.data
      }
    case SET_GAME_DATA:
      return {
        ...state,
        gameData: action.data
      }
    default: 
      return state
  }
}
export default rUserInfo