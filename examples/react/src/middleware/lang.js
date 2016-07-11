import { createLang } from '../../../../../redux-lang'
// import { createLang } from 'redux-lang'
import dictionary from '../lang/index'
const reduxLang = createLang(dictionary)
export default reduxLang
