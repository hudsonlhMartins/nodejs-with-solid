import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export const registerController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(3),
  })

  const registerBody = registerBodySchema.parse(request.body)

  const { email, password, name } = registerBody

  try {
    const registerUserCase = makeRegisterUseCase()
    await registerUserCase.execute({ email, password, name })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
