import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import reduxLang from '../middleware/lang'
import Layout from './Layout'
import LanguagesDropdown from './LanguagesDropdown'
import LANGUAGES from '../constants/languages'

const App = ({t, lang}) => {
  return (
    <Layout>
      <Text>{t('current_language')}: {LANGUAGES[lang]}</Text>
      <Text>{t('it_works')}</Text>
      <LanguagesDropdown />
    </Layout>
  )
}
export default reduxLang(App, 'home')
