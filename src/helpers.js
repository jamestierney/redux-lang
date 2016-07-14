import { vsprintf } from 'sprintf-js'

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
