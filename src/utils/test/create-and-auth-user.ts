import { FastifyInstance } from 'fastify'
import request from 'supertest'
export const createAndAuthUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '12345678',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@gmail.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}