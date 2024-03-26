import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controller'
import { autheticateController } from './controllers/authenticate.controller'
import { profile } from './controllers/profile.controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', autheticateController)

  /* Authenticated */
  app.get('/me',{onRequest: [verifyJWT]}, profile)
}
