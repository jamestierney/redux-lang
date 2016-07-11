/* global describe it */
/* eslint-env mocha */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { createStore, combineReducers } from 'redux'
import { createLang, getString, applyReplacements } from '../src/createLang'
import reducer from '../src/reducer'

const dictionary = {
  en: {
    home: {
      welcome: 'Welcome, %s!'
    }
  },
  fr: {
    home: {
      welcome: 'Bienvenue, %s!'
    }
  }
}

const Welcome = ({locale, t}) => {
  return (
    <p>Welcome, {t('welcome', ['James'])}</p>
  )
}

const setup = () => {
  const reducers = combineReducers({ locale: reducer('en') })
  const store = createStore(reducers)
  const reduxLang = createLang(dictionary)
  const Wrapped = reduxLang('home')(Welcome)
  const enzymeWrapper = shallow(<Wrapped store={store} />)
  return {
    store,
    reduxLang,
    enzymeWrapper,
    Wrapped
  }
}

describe('createLang', () => {
  // it('should initialise the language decorator with the dictionary', () => {
  //   const { reduxLang } = setup()
  //   expect(reduxLang('home')).to.be.a('function')
  // })
  it('should apply replacements to a given string', () => {
    const output = 'Welcome, James!'
    const result = applyReplacements('Welcome, %s!', ['James'])
    expect(result).to.equal(output)
  })
  it('should return the appropriate string from the dictionary', () => {
    const output = 'Welcome, James!'
    const result = getString(dictionary)('en')('home')('welcome', ['James'])
    expect(result).to.equal(output)
  })
  it('should output an error and return the key if not present', () => {
    let result = getString(dictionary)('de')('home')('welcome', ['James'])
    expect(result).to.equal('welcome')
    result = getString(dictionary)('en')('about')('welcome')
    expect(result).to.equal('welcome')
    result = getString(dictionary)('en')('home')('goodbye')
    expect(result).to.equal('goodbye')
  })
  it('should decorate the component', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.nodes[0].props.locale).to.equal('en')
    expect(enzymeWrapper.nodes[0].props.t('welcome', ['James']))
      .to.equal('Welcome, James!')
    const expected = { type: 'REDUX_LANG_SET_LOCALE', value: 'fr' }
    expect(enzymeWrapper.nodes[0].props.setLocale('fr')).to.eql(expected)
  })
})
