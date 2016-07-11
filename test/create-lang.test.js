/* global describe it */
/* eslint-env mocha */

// import React from 'react'
import { expect } from 'chai'
import { createLang } from '../src/createLang'

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
// const Component = ({ locale }) => {
//   return <p>{locale}</p>
// }

let lang

describe('createLang', () => {
  it('should initialise the language decorator with the dictionary', () => {
    lang = createLang(dictionary)
    expect(lang('home')).to.be.a('function')
  })
  // it('should decorate the component', () => {
  //   const NewComponent = lang('home')(Component)
  //
  //   // expect(lang('home')).to.be.a('function')
  // })
})
