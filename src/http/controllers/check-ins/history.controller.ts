import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export const checkInsHistoryontroller = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const checkInsHistoryQuery = checkInsHistoryQuerySchema.parse(request.query)

  const { page } = checkInsHistoryQuery

  const checkInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await checkInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })
  return reply.status(200).send({ checkIns })
}
