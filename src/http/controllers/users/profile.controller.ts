import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const getUseProfile = makeGetUserProfileUseCase()
  const { user } = await getUseProfile.execute({
    userId,
  })
  const { password_hash, ...userWithoutPassword } = user
  return reply.status(200).send({
    user: userWithoutPassword,
  })
}
