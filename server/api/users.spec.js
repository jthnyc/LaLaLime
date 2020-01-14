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

  describe('/api/users/', () => {
    const rachelsEmail = 'rachel@gmail.com'

    beforeEach(() => {
      return User.create({
        email: rachelsEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users')

      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(rachelsEmail)
    })

    describe('GET /api/users/:userId', async () => {
      it('gets the user with the specified id', async () => {
        const res = await request(app)
          .get('/api/users/1')
          .expect(200)

        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.equal(1)
        expect(res.body[0].email).to.be.equal(rachelsEmail)
      })

      describe('POST /api/users', () => {
        it('creates a new user and responds with the user', async () => {
          const res = await request(app)
            .post('/api/users')
            .send({
              email: 'rachel@gmail.com'
            })

          expect(res.status).to.be.equal(201)
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.equal('rachel@gmail.com')
        })

        it('saves the new user to the database', async () => {
          const newUser = await User.findOne({
            where: {
              email: 'rachel@gmail.com'
            }
          })

          expect(newUser).to.be.an('object')
          expect(newUser.email).to.equal('rachel@gmail.com')
        })

        it('responds with an error if there is already a user with that email', async () => {
          const firstNewUser = await User.create({
            email: 'rachel@gmail.com'
          })
          const secondNewUser = await User.build({
            email: 'rachel@gmail.com'
          })

          expect(res.status).to.equal(400)
          expect(secondNewUser).to.be.equal(undefined)
        })
      })
    })
  })
})
