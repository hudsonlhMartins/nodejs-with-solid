import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createCheckInsController } from './create.controller'
import { validateCheckInsController } from './validate.controller'
import { checkInsMetricsontroller } from './metrics.controller'
import { checkInsHistoryontroller } from './history.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // todas as rotas abaixo vão passar pelo middleware verifyJWT

  app.get('/check-ins/metrics', checkInsMetricsontroller)
  app.get('/check-ins/history', checkInsHistoryontroller)
  app.post('/gyms/:gymId/check-ins', createCheckInsController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInsController)
}
