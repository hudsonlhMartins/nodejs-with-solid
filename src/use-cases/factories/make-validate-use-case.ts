import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckinUseCase } from '../validate-check-in'

export const makeValidateUseCase = () => {
  const checkInsRepository = new PrismaCheckinsRepository()
  const validateCheckinUseCase = new ValidateCheckinUseCase(checkInsRepository)

  return validateCheckinUseCase
}
