/* global describe it */
/* eslint-env mocha */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { createStore, combineReducers } from 'redux'
import { createLang } from '../src/createLang'
import reducer from '../src/reducer'

const dictionary = {
  en: {
    home: {
      welcome: 'Welcome, %s!',
      it_works: 'It works!!!'
    }
  },
  fr: {
    home: {
      welcome: 'Bienvenue, %s!',
      it_works: 'Ça marche!!!'
    }
  }
}

const Welcome = ({locale, t}) => {
  return (
    <p>Welcome, {t('welcome', ['James'])}</p>
  )
}

describe('createLang', () => {
  it('should decorate the component, using default config', () => {
    const reducers = combineReducers({ locale: reducer('en') })
    const store = createStore(reducers)
    const reduxLang = createLang(dictionary)
    const Wrapped = reduxLang('home')(Welcome)
    const enzymeWrapper = shallow(<Wrapped store={store} />)
    expect(enzymeWrapper.nodes[0].props.locale).to.equal('en')
    expect(enzymeWrapper.nodes[0].props.t('welcome', ['James']))
      .to.equal('Welcome, James!')
    const expected = { type: 'REDUX_LANG_SET_LOCALE', value: 'fr' }
    expect(enzymeWrapper.nodes[0].props.setLocale('fr')).to.eql(expected)
  })
  it('should decorate the component, using custom config', () => {
    const reducers = combineReducers({ lang: reducer('en') })
    const store = createStore(reducers)
    const reduxLang = createLang(dictionary, {reducerKey: 'lang'})
    const Wrapped = reduxLang('home')(Welcome)
    const enzymeWrapper = shallow(<Wrapped store={store} />)
    expect(enzymeWrapper.nodes[0].props.lang).to.equal('en')
    expect(enzymeWrapper.nodes[0].props.t('welcome', ['James']))
      .to.equal('Welcome, James!')
    const expected = { type: 'REDUX_LANG_SET_LOCALE', value: 'fr' }
    expect(enzymeWrapper.nodes[0].props.setLocale('fr')).to.eql(expected)
  })
})
