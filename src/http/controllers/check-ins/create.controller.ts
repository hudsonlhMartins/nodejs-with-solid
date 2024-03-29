import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export const createCheckInsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const checkInsBody = createCheckInsBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.query)

  const { latitude, longitude } = checkInsBody

  const createGymUseCase = makeCheckInUseCase()
  await createGymUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(201).send()
}
