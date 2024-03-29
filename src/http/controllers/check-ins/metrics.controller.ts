import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export const checkInsMetricsontroller = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const checkInsMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCounter } = await checkInsMetricsUseCase.execute({
    userId: request.user.sub,
  })
  return reply.status(201).send({ checkInsCounter })
}
