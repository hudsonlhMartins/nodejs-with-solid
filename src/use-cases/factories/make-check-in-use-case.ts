import { CheckinUseCase } from '../check-in'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckinsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return useCase
}
