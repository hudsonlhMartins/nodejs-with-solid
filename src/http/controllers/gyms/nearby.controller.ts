import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearByUseCase } from '@/use-cases/factories/make-fetch-nearby-use-case'

export const nearbyGymsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const nearByQuerySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const nearByQuery = nearByQuerySchema.parse(request.body)

  const { latitude, longitude } = nearByQuery

  const nearByGymUseCase = makeFetchNearByUseCase()
  const { gym } = await nearByGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(201).send({ gym })
}
