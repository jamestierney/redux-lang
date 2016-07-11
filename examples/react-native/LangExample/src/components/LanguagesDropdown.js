import React from 'react'
import { SegmentedControlIOS } from 'react-native'
import reduxLang from '../middleware/lang'
import LANGUAGES from '../constants/languages'

const getKeyFromDictionaryByValue = dictionary => value =>
  Object.keys(dictionary).filter(x => dictionary[x] === value)[0]

const getIndexOfValue = dictionary => value => {
  const keys = Object.keys(dictionary)
  return keys.indexOf(value)
}

const LanguagesDropdown = ({t, lang, setLanguage}) => {
  return (
    <SegmentedControlIOS
      style={{ width: 300 }}
      values={Object.values(LANGUAGES)}
      selectedIndex={getIndexOfValue(LANGUAGES)(lang)}
      onValueChange={(value) => { setLanguage(getKeyFromDictionaryByValue(LANGUAGES)(value)) }}
    />
  )
}

export default reduxLang(LanguagesDropdown, 'home')
