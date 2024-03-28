import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    const respose = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    expect(respose.status).toBe(200)
    expect(respose.body).toEqual({
      token: expect.any(String),
    })
  })
})
