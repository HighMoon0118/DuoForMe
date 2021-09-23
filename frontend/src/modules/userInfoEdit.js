const LOL_NICKNAME_EDIT = "userEdit/LOL_NICKNAME_EDIT"
const SERVICE_NICKNAME_EDIT = "userEdit/SERVICE_NICKNAME_EDIT"
const BLACKLIST_EDIT = "userEdit/BLACKLIST_EDIT"

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
  lolNickname: "초기 롤 닉네임",
  serviceNickname: "서비스 닉네임",
  blackList: ["닉네임1", "닉네임2", "닉네임3"],
  email: "asdgg@gamil.com"
}

function userInfoEdit(state = initialState, action) {
  switch (action.type) {
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
export default userInfoEdit