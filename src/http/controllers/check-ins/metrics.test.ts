import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Check-ins Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get count metrics of check-ins', async () => {
    const { token } = await createAndAuthUser(app)
    const gymData = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        phone: '2213123',
        description: 'academia do zé é top dms cara é top dms',
        latitude: -23.5505199,
        longitude: -46.6333094,
      })

    const {gym} = await gymData.body
    
    const checkInsData = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5505199,
        longitude: -46.6333094,
      })

    const response = await request(app.server)
    .get(`/check-ins/metrics`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.checkInsCounter).toEqual(1)
  })
})
