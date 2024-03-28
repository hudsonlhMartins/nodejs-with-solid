import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export const createGymController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createGymBodySchema = z.object({
    title: z.string().email(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const registerBody = createGymBodySchema.parse(request.body)

  const { ...props } = registerBody

  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({ ...props })
  return reply.status(201).send()
}
