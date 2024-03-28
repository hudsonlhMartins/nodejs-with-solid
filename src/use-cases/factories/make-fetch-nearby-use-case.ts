import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FeatchNearByGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearByUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FeatchNearByGymsUseCase(prismaGymsRepository)

  return useCase
}
