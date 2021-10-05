const USER_INFO = "userInfo/USER_INFO"
const GET_BLACKLIST = "userInfo/GET_BLACKLIST"
const LOL_NICKNAME_EDIT = "userInfo/LOL_NICKNAME_EDIT"
const SERVICE_NICKNAME_EDIT = "userInfo/SERVICE_NICKNAME_EDIT"
const BLACKLIST_EDIT = "userInfo/BLACKLIST_EDIT"
const LOGOUT ="userInfo/LOGOUT"
const GET_MATHCING_HISTORY = "userInfo/GET_MATHCING_HISTORY"
export const getUserInfo = ( data ) => ({
  type: USER_INFO,
  data
})
export const blacklist = ( blackList) => ({
  type: GET_BLACKLIST,
  blackList
})
export const lolEdit = ( lolNickname ) => ({
  type: LOL_NICKNAME_EDIT,
  lolNickname,
  })
export const serviceEdit = ( serviceNickname ) => ({
  type: SERVICE_NICKNAME_EDIT,
  serviceNickname,
  })
export const blackListEdit = ( blackList ) => ({
  type: BLACKLIST_EDIT,
  blackList
  })
export const logout = () => ({
  type: LOGOUT,
})
export const getMatching = ( matchinghistory ) => ({
  type: GET_MATHCING_HISTORY,
  matchinghistory
})
const initialState = {
  isLogin: false,
  userId: null,
  email: "",
  serviceNickname: "",
  userCredit: null,
  lolNickname: "",
  blackList: [],
  matchinghistory: []
}
function userInfo(state = initialState, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        isLogin: true,
        userId: action.data.userId,
        serviceNickname: action.data.serviceNickname,
        email: action.data.email,
        userCredit: action.data.userCredit,
        lolNickname: action.data.lolNickname,
      }
    case GET_BLACKLIST:
      return {
        ...state,
        blackList: action.blackList
      }
    case LOL_NICKNAME_EDIT:
      return {
        ...state,
        lolNickname: action.lolNickname,
      }
    case SERVICE_NICKNAME_EDIT:
      return {
        ...state,
        serviceNickname: action.serviceNickname,
      }
    case BLACKLIST_EDIT:
      return {
        ...state,
        blackList: action.blackList,
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false
      }
    case GET_MATHCING_HISTORY:
      return {
        ...state,
        matchinghistory: action.matchinghistory
      }
    default: 
      return state
  }
}
export default userInfo