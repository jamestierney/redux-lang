import React from 'react'
import reduxLang from '../middleware/lang'
import LANGUAGES from '../constants/languages'

const getValues = () => Object.keys(LANGUAGES).map((key, i) => {
  const value = LANGUAGES[key]
  return <option key={i} value={key}>{value}</option>
})

const LanguagesDropdown = ({t, locale, setLocale}) => {
  return (
    <div className='form-group'>
      <label>{t('select_language')}:</label>
      <select className='form-control'
        value={locale}
        onChange={(event) => setLocale(event.target.value)}>
        {getValues()}
      </select>
    </div>
  )
}

export default reduxLang('home')(LanguagesDropdown)
