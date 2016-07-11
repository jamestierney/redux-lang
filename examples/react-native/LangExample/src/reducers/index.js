import { combineReducers } from 'redux'
import { langReducer } from 'redux-lang'

export default combineReducers({
  // All your other reducers here
  locale: langReducer('en')
})
