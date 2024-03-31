import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { autheticateController } from './authenticate.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshController } from './refresh.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', autheticateController)
  app.patch('/token/refresh', refreshController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
