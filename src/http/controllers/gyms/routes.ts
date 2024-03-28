import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { nearbyGymsController } from './nearby.controller'
import { searchGymController } from './search.controller'
import { createGymController } from './create.controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // todas as rotas abaixo vão passar pelo middleware verifyJWT

  app.get('/gyms/nearby', nearbyGymsController)
  app.get('/gyms/search', searchGymController)
  app.post('/gyms', createGymController)
}
