import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym', async () => {
    const { token } = await createAndAuthUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        phone: '2213123',
        description: 'academia do zé é top dms cara é top dms',
        latitude: -23.5505199,
        longitude: -46.6333094,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia mec forma',
        phone: '2213123',
        description: 'academia do zé é top dms cara é top dms',
        latitude: -23.5505199,
        longitude: -46.6333094,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Academia mec forma' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.gym).toHaveLength(1)
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: 'Academia mec forma',
      }),
    ])
  })
})
