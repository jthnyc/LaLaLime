/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/users/', () => {
    const rachelsEmail = 'rachel@gmail.com'
    const sessionId = 'vVsm3bnksY8qJmm_qIOF3lByOHhKopjn'

    beforeEach(() => {
      return User.create({
        email: rachelsEmail,
        sessionId: sessionId
      })
    })

    it('Displays a list of all users', async () => {
      const res = await request(app).get('/api/users')

      expect(res.status).to.be.equal(403)
    })
  })

  describe('GET /api/users/:userId', () => {
    const rachelsEmail = 'rachel@gmail.com'
    const sessionId = 1
    const user = User.create({
      email: rachelsEmail,
      sessionId: sessionId
    })

    beforeEach(() => {
      return user
    })

    it('displays the user with the specified id', async () => {
      const userId = 1
      if (userId == user.sessionId) {
        const res = await request(app)
          .get(`/api/users/${userId}`)
          .expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.email).to.be.equal(rachelsEmail)
        expect(res.body.sessionId).to.be.equal(sessionId)
      } else {
        const res = await request(app)
          .get(`/api/users/${userId}`)
          .expect(403)

        expect(res.body).to.be('Forbidden')
      }
    })
  })
  describe('POST /auth/signup', () => {
    beforeEach(async () => {
      await request(app).get('/')
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 'cercle@gmail.com',
          password: '12345'
        })
      expect(res.status).to.be.equal(201)
      expect(res.body).to.be.an('object')
      expect(res.body.email).to.equal('cercle@gmail.com')
      expect(res.body.password).to.not.equal('12345')
    })
    it('creates a new session first, and create a new user and responds with the user', async () => {})

    it('saves the new user to the database', async () => {
      const newUser = await User.findOne({
        where: {
          email: 'cercle@gmail.com'
        }
      })
      expect(newUser).to.be.an('object')
      expect(newUser.email).to.equal('cercle@gmail.com')
    })
    it('responds with an error if there is already a user with that email', async () => {
      try {
        const newUser = await User.create({
          email: 'cercle@gmail.com'
        })
        expect(newUser).to.be.equal(undefined)
      } catch (err) {
        expect(err.name).to.equal('SequelizeUniqueConstraintError')
      }
    })
  })
})
