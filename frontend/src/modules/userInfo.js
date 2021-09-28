const USER_INFO = "userInfo/USER_INFO"
const LOL_NICKNAME_EDIT = "userEdit/LOL_NICKNAME_EDIT"
const SERVICE_NICKNAME_EDIT = "userEdit/SERVICE_NICKNAME_EDIT"
const BLACKLIST_EDIT = "userEdit/BLACKLIST_EDIT"

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
        isLogin: !action.data.isLogin,
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
    default:
      return state
  }
}
export default userInfo