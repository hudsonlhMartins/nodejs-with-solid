import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { nearbyGymsController } from './nearby.controller'
import { searchGymController } from './search.controller'
import { createGymController } from './create.controller'
import { validateRoles } from '@/http/middlewares/validate-roles'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // todas as rotas abaixo vão passar pelo middleware verifyJWT

  app.post('/gyms/nearby', nearbyGymsController)
  app.get('/gyms/search', searchGymController)
  app.post('/gyms', {onRequest:[validateRoles('ADMIN')]}, createGymController)
}
