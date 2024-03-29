import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateUseCase } from '@/use-cases/factories/make-validate-use-case'

export const validateCheckInsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.query)

  const validateGymUseCase = makeValidateUseCase()
  await validateGymUseCase.execute({
    checkInId,
    userId: request.user.sub,
  })
  return reply.status(204).send()
}
