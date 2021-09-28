const USER_INFO = "userInfo/USER_INFO"
const LOL_NICKNAME_EDIT = "userInfo/LOL_NICKNAME_EDIT"
const SERVICE_NICKNAME_EDIT = "userInfo/SERVICE_NICKNAME_EDIT"
const BLACKLIST_EDIT = "userInfo/BLACKLIST_EDIT"
const LOGOUT ="userInfo/LOGOUT"
export const getUserInfo = ( data ) => ({
  type: USER_INFO,
  data
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
const initialState = {
  isLogin: false,
  userId: null,
  email: "",
  serviceNickname: "",
  userCredit: null,
  lolNickname: "",
  blackList: ["닉네임1", "닉네임2", "닉네임3"],
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
    default: 
      return state
  }
}
export default userInfo