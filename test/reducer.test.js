/* global describe it */
/* eslint-env mocha */

import { expect } from 'chai'
import langReducer from '../src/reducer'
import { REDUX_LANG_SET_LOCALE } from '../src/actionTypes'

let reducer
const initialValue = 'en'

describe('reducers', () => {
  describe('initialise', () => {
    it('should return a reducer function', () => {
      reducer = langReducer(initialValue)
      expect(reducer).to.be.a('function')
    })
  })
  describe('default state', () => {
    it('should return the initial state as default', () => {
      const stateAfter = 'en'
      expect(reducer()).to.equal(stateAfter)
    })
  })
  describe('set locale', () => {
    it('should set the state to the new value', () => {
      const stateBefore = 'en'
      const stateAfter = 'fr'
      const action = {
        type: REDUX_LANG_SET_LOCALE,
        value: 'fr'
      }
      expect(reducer(stateBefore, action)).to.equal(stateAfter)
    })
  })
})
