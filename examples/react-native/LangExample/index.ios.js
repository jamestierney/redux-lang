import React from 'react'
import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/reducers/index'
import App from './src/components/App'
const store = createStore(reducers)

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent('LangExample', () => Root)
