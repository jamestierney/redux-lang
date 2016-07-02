# ReduxLang
A Redux implementation for simple React and React Native language i18n.

## Installation
```npm install --save redux-lang```

## Usage

### Step 1
Create a map of language strings, e.g. assets/lang/en.js:
```
export default {
  home: {
    welcome: 'Hello'
  }
}
```

### Step 2
Create an index file for each of your languages, e.g. assets/lang/index.js:
```
import en from './en'
import fr from './fr'

export default {
  en,
  fr,
}
```

### Step 3
Add the redux-lang reducer to your root reducer. This is a function which takes the initial language key as an argument.

```
import { combineReducers } from 'redux'
import { langReducer } from 'redux-lang'

export default combineReducers({
  // All your other reducers here
  lang: langReducer('en'),
})
```

### Step 4
Initialise ReduxLang in your application, e.g. src/middleware/lang.js
```
import { createLang } from 'redux-lang'
import strings from '../../assets/lang/index'
const reduxLang = createLang(strings)
export default reduxLang
```

### Step 5
Decorate your component with reduxLang(). This will provide your component with props which you can use to access your language files and set the current language.

```
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { reduxLang } from '../middleware/lang'

const Demo = ({rlang, lang, setLanguage}) => {
  const l = rlang('home')
  console.log(lang) // 'en'
  return (
    <View style={{top: 20}}>
      <Text>{l('welcome')}</Text>
    </View>
  )
}
export default reduxLang(Demo)
```
