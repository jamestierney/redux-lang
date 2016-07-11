import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

const defaultConfig = {
  reducerKey: 'locale'
}

export const createLang = (dictionary, config = defaultConfig) => {
  const getString = localeKey => screenKey => stringKey => {
    return [localeKey, screenKey, stringKey].reduce((acc, key) => {
      if (acc[key]) return acc[key]
      console.warn(`ReduxLang: ${localeKey} / ${screenKey} / ${stringKey} does not exist!`)
      return key
    }, dictionary)
  }
  return screenKey => component => {
    const { reducerKey } = config
    const mstp = ({ [reducerKey]: locale }) =>
      ({ [reducerKey]: locale, t: getString(locale)(screenKey) })
    const mdtp = dispatch => bindActionCreators(actions, dispatch)
    return connect(mstp, mdtp)(component)
  }
}
