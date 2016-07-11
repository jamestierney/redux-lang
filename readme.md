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
  fr
}
```

### Step 3
Initialise ReduxLang in your application, e.g. src/middleware/lang.js,
using your dictionary file
```
import { createLang } from 'redux-lang'
import dictionary from '../../assets/lang/index'
const reduxLang = createLang(dictionary)
export default reduxLang
```

### Step 4
Add the redux-lang reducer to your root reducer.
This is a function which takes the initial language key as an argument.

```
import { combineReducers } from 'redux'
import { langReducer } from 'redux-lang'

export default combineReducers({
  // All your other reducers here
  locale: langReducer('en'),
})
```

### Step 5
Decorate your component with reduxLang().
This will provide your component with props which you can use to access your
language strings and set the current language. You need to pass a second
argument to represent the 'screen key' in your dictionary.
```
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { reduxLang } from '../middleware/lang'

const Demo = ({t, locale, setLocale}) => {
  console.log(locale) // 'en'
  return (
    <View style={{top: 20}}>
      <Text>{t('welcome')}</Text>
    </View>
  )
}
export default reduxLang(Demo, 'home')
```
