import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export const searchGymController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchQuerySchema = z.object({
    q: z.string().min(3),
    page: z.coerce.number().min(1).default(1),
  })

  const searchQuery = searchQuerySchema.parse(request.body)

  const { q, page } = searchQuery

  const searchGymUseCase = makeSearchGymsUseCase()
  const { gym } = await searchGymUseCase.execute({ query: q, page })
  return reply.status(201).send({ gym })
}
