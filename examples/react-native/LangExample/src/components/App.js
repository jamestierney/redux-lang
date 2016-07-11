import React from 'react'
import { Text } from 'react-native'
import reduxLang from '../middleware/lang'
import Layout from './Layout'
import LanguagesSegmentedControl from './LanguagesSegmentedControl'
import LANGUAGES from '../constants/languages'

const App = ({t, locale}) => {
  return (
    <Layout>
      <Text>{t('current_language')}: {LANGUAGES[locale]}</Text>
      <Text>{t('it_works')}</Text>
      <LanguagesSegmentedControl />
    </Layout>
  )
}
export default reduxLang('home')(App)
