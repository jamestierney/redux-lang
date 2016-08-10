/* global describe it */
/* eslint-env mocha */

import { expect } from 'chai'
import { getString, applyReplacements, square } from '../src/helpers'

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

describe('helpers', () => {
  it('should square a number', () => {
    const expected = 4
    const actual = square(2)
    expect(actual).to.equal(expected)
  })
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
})
