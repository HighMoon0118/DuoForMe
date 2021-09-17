// reducer 하나로 합치는 곳
import { combineReducers } from "redux"
import matching from "./matching"
import selectLine from "./selectLine"

const rootReducer = combineReducers({
  matching,
  selectLine
})
export default rootReducer