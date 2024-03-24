import fastify from 'fastify'

import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like datadog/NewRelic/Sentry
    /*
        isso e para obervabilidade, para saber o que esta acontecendo com a aplicacao
    */
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export { app }