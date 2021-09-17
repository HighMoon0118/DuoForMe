const MY_LINE = "selectLine/MY_LINE"
const YOUR_LINE = "selectLine/YOUR_LINE"

export const myLine = ( me ) => ({
  type: MY_LINE,
  me
})
export const yourLine = ( you ) => ({
  type: YOUR_LINE,
  you
})
const initialState = {
  me: "",
  you: ""
}
function selectLine(state = initialState, action) {
  switch (action.type) {
    case MY_LINE:
      return {
        ...state,
        me: action.me,
      }
    case YOUR_LINE:
      return {
        ...state,
        you: action.you,
      }
    default:
      return state
  }
}
export default selectLine