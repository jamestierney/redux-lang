import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { vsprintf } from 'sprintf-js'
import * as actions from './actions'

const defaultConfig = {
  reducerKey: 'locale'
}

export const applyReplacements = (obj, replacements = []) => {
  return (typeof obj === 'string' && replacements.length > 0)
    ? vsprintf(obj, replacements)
    : obj
}

export const getString = dictionary => localeKey => screenKey => (stringKey, replacements = []) => {
  return [localeKey, screenKey, stringKey].reduce((acc, key) => {
    if (acc[key]) return applyReplacements(acc[key], replacements)
    console.warn(`ReduxLang: ${localeKey} / ${screenKey} / ${stringKey} does not exist!`)
    return key
  }, dictionary)
}

export const createLang = (dictionary, config = defaultConfig) => {
  const getStringFromDictionary = getString(dictionary)
  return screenKey => component => {
    const { reducerKey } = config
    const mstp = ({ [reducerKey]: locale }) =>
      ({ [reducerKey]: locale, t: getStringFromDictionary(locale)(screenKey) })
    const mdtp = dispatch => bindActionCreators(actions, dispatch)
    return connect(mstp, mdtp)(component)
  }
}
