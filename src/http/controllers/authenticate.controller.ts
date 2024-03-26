import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/erros/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export const autheticateController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const authenticateBody = authenticateBodySchema.parse(request.body)

  const { email, password } = authenticateBody

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
   const {user} = await authenticateUseCase.execute({ email, password })
   const token = await reply.jwtSign({}, {
    sign:{
      sub: user.id,
    }
   })

   return reply.status(200).send({
    token
   })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
 
}