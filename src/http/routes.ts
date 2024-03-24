import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register-controller'
import { autheticateController } from './controllers/authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', autheticateController)
}
