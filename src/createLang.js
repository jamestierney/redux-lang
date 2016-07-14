import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getString } from './helpers'

const defaultConfig = {
  reducerKey: 'locale'
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
