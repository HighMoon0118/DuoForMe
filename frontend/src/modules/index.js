// reducer 하나로 합치는 곳
import { combineReducers } from "redux"
import matching from "./matching"

const rootReducer = combineReducers({
  matching,
})
export default rootReducer