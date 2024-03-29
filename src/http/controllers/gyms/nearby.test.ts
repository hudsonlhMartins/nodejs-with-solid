import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('NearBy Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to nearBy gym', async () => {
    const { token } = await createAndAuthUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'description',
        latitude: -22.4721109,
        longitude: -42.1963846,
        phone: '123456789',
        title: 'far gym',
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'description',
        latitude: -22.2104039,
        longitude: -41.671004,
        phone: '123456789',
        title: 'near gym',
      })

    const response = await request(app.server)
      .post('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.2104039,
        longitude: -41.671004,
      })

    expect(response.status).toEqual(201)
    expect(response.body.gym).toHaveLength(1)
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: 'near gym',
      }),
    ])
  })
})
