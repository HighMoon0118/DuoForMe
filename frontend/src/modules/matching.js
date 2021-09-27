const CHANGE_MATCHING = "matching/CHANGE_MATCHING"

export const changeMatching = ( isMatching, time ) => ({
  type: CHANGE_MATCHING,
  isMatching,
  time
})

const initialState = {
  isMatching: false,
  time: undefined
}
function matching(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MATCHING:
      return {
        ...state,
        isMatching: !action.isMatching,
        time: action.time
      }
    default:
      return state
  }
}
export default matching