import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'johndoe@gmail.com',
        password: '12345678',
      })

    const cookies = authResponse.headers['set-cookie']

    const respose = await request(app.server).patch('/token/refresh').set('Cookie',cookies).send()

    expect(respose.status).toBe(200)
    expect(respose.body).toEqual({
      token: expect.any(String),
    })
    expect(respose.headers['set-cookie']).toEqual([
        expect.stringContaining('refreshToken='),
    ])
  })
})
