/* global describe it */
/* eslint-env mocha */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { createStore, combineReducers } from 'redux'
import { createLang, getString } from '../src/createLang'
import reducer from '../src/reducer'

const dictionary = {
  en: {
    home: {
      welcome: 'Welcome'
    }
  },
  fr: {
    home: {
      welcome: 'Bienvenue'
    }
  }
}

const Welcome = ({locale}) => {
  return (
    <p>Welcome {locale}</p>
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
  it('should return the appropriate string from the dictionary', () => {
    const output = 'Welcome'
    const result = getString(dictionary)('en')('home')('welcome')
    expect(result).to.equal(output)
  })
  it('should output an error and return the key if not present', () => {
    let result = getString(dictionary)('de')('home')('welcome')
    expect(result).to.equal('welcome')
    result = getString(dictionary)('en')('about')('welcome')
    expect(result).to.equal('welcome')
    result = getString(dictionary)('en')('home')('goodbye')
    expect(result).to.equal('goodbye')
  })
  it('should decorate the component', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.nodes[0].props.locale).to.equal('en')
    expect(enzymeWrapper.nodes[0].props.t('welcome')).to.equal('Welcome')
    const expected = { type: 'REDUX_LANG_SET_LOCALE', value: 'fr' }
    expect(enzymeWrapper.nodes[0].props.setLocale('fr')).to.eql(expected)
  })
})
