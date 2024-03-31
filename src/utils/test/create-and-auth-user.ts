import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
export const createAndAuthUser = async (app: FastifyInstance, role: 'MEMBER'|'ADMIN' = 'ADMIN') => {

  await prisma.user.create({
    data:{
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('12345678',6),
      role: role,
    }
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
