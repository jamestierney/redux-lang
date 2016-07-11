import React from 'react'
import reduxLang from '../middleware/lang'
import Layout from './Layout'
import LanguagesDropdown from './LanguagesDropdown'
import LANGUAGES from '../constants/languages'

const App = ({t, locale}) => {
  return (
    <Layout>
      <h2>{t('current_language')}: {LANGUAGES[locale]}</h2>
      <LanguagesDropdown />
      <p>{t('it_works')}</p>
    </Layout>
  )
}
export default reduxLang('home')(App)
