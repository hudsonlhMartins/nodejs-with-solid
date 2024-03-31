import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie:{
    cookieName: 'refreshToken',
    signed: false
  }, 
  sign: { expiresIn: '1h' },
})
app.register(fastifyCookie)

app.register(gymsRoutes)
app.register(usersRoutes)
app.register(checkInsRoutes)

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
