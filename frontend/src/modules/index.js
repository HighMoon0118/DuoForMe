// reducer 하나로 합치는 곳
import { combineReducers } from "redux"
import matching from "./matching"
import selectLine from "./selectLine"
// import userInfoEdit from "./userInfoEdit"
import userInfo from "./userInfo"
import rUserInfo from "./rUserInfo"

const rootReducer = combineReducers({
  matching,
  selectLine,
  // userInfoEdit,
  userInfo,
  rUserInfo,
})
export default rootReducer