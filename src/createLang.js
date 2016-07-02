import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

export const createLang = (strings) => {
  const getString = language => screen => key => {
    return [language, screen, key].reduce((acc, key) => {
      if (acc[key]) return acc[key]
      console.warn(`ReduxLang: ${language} / ${screen} / ${key} does not exist!`)
      return key
    }, strings)
  }
  return (component) => {
    const mstp = ({ lang }) => ({ lang, rlang: getString(lang) })
    const mdtp = dispatch => bindActionCreators(actions, dispatch)
    return connect(mstp, mdtp)(component)
  }
}
