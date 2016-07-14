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

  // it('should initialise the language decorator with the dictionary', () => {
  //   const { reduxLang } = setup()
  //   expect(reduxLang('home')).to.be.a('function')
  // })

  it('should apply replacements to a given string', () => {
    const expected = 'Welcome, James!'
    const actual = applyReplacements('Welcome, %s!', ['James'])
    expect(actual).to.equal(expected)
  })
  it('should return the input string if replacements are not present', () => {
    const expected = 'Welcome, %s!'
    const actual = applyReplacements('Welcome, %s!')
    expect(actual).to.equal(expected)
  })
  it('should return the appropriate string from the dictionary', () => {
    const expected = 'Ça marche!!!'
    const actual = getString(dictionary)('fr')('home')('it_works')
    expect(actual).to.equal(expected)
  })
  it('should return the appropriate string from the dictionary and apply replacements', () => {
    const expected = 'Welcome, James!'
    const actual = getString(dictionary)('en')('home')('welcome', ['James'])
    expect(actual).to.equal(expected)
  })
  it('should output an error and return the key if not present', () => {
    let actual = getString(dictionary)('de')('home')('welcome', ['James'])
    expect(actual).to.equal('welcome')
    actual = getString(dictionary)('en')('about')('welcome')
    expect(actual).to.equal('welcome')
    actual = getString(dictionary)('en')('home')('goodbye')
    expect(actual).to.equal('goodbye')
  })
  it('should decorate the component', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.nodes[0].props.locale).to.equal('en')
    expect(enzymeWrapper.nodes[0].props.t('welcome', ['James']))
      .to.equal('Welcome, James!')
    const expected = { type: 'REDUX_LANG_SET_LOCALE', value: 'fr' }
    expect(enzymeWrapper.nodes[0].props.setLocale('fr')).to.eql(expected)
  })
  it('should return reduxLang', () => {
    const { reduxLang } = setup()
    const homeStrings = reduxLang('home')
    expect(homeStrings).to.be.a('function')
  })
})
