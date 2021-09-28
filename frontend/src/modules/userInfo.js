const USER_INFO = "userInfo/USER_INFO"
export const getUserInfo = ( data ) => ({
  type: USER_INFO,
  data
})

const initialState = {
  isLogin: false,
  userId: null,
  email: "",
  serviceNickname: "",
  userCredit: null,
  lolNickname: ""
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
    default:
      return state
  }
}
export default userInfo