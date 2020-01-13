/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getLeggings, getSingleLegging} from './leggings'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {leggings: [], singleLegging: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get all leggings', () => {
    it('GET responds with all leggings on main page', async () => {
      const fakeProducts = [
        {
          name: 'Leggings',
          imageUrl:
            'https://athleta.gap.com/webcontent/0017/530/741/cn17530741.jpg',
          id: 1
        }
      ]
      mockAxios.onGet('/api/leggings').replyOnce(200, fakeProducts)
      await store.dispatch(getLeggings())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_PRODUCTS')
      expect(actions[0].leggings).to.be.deep.equal(fakeProducts)
    })
  })

  describe('get single product', () => {
    it('GET responds with the single legging view', async () => {
      const fakeLegging = {
        name: 'Legging1',
        imageUrl:
          'https://athleta.gap.com/webcontent/0017/530/741/cn17530741.jpg',
        id: 2
      }
      mockAxios.onPost(`/api/leggings/:${fakeLegging.id}`).replyOnce(204)
      await store.dispatch(getSingleLegging(fakeLegging))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SINGLE_LEGGING')
      expect(actions[0].singleLegging).to.be.deep.equal(fakeLegging)
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
