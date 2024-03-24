import { ResourceNotExist } from '@/erros/resource-not-exists'
import { UserAlreadyCheckError } from '@/erros/user-already-check'
import { UserTooFarGym } from '@/erros/user-too-far-gym'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'
import { CheckIn } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

interface ValidateCheckinUseCaseProps {
  userId: string
  checkInId: string
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(
      private checkInsRepository: CheckInsRepository,
    ) {}

  async execute({
   checkInId
  }: ValidateCheckinUseCaseProps): Promise<ValidateCheckinUseCaseResponse> {

   
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if(!checkIn) throw new ResourceNotExist()

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return {
        checkIn,
    }
  }
}
