import * as types from './actionTypes'

export default (initialState) => {
  return (state = initialState, action = {}) => {
    switch (action.type) {

      case types.REDUX_LANG_SET_LANGUAGE:
        return action.value

      default:
        return state
    }
  }
}
