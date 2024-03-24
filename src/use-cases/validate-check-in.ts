import { LateCheckInValidationError } from '@/erros/late-check-in-validation-error'
import { ResourceNotExist } from '@/erros/resource-not-exists'
import { UserAlreadyCheckError } from '@/erros/user-already-check'
import { UserTooFarGym } from '@/erros/user-too-far-gym'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'
import { CheckIn } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minute') // retorna a diferença em minutos entre a data atual e a data de criação do check-in
    console.log('distanceInMinutesFromCheckInCreation', distanceInMinutesFromCheckInCreation)

    if(distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return {
        checkIn,
    }
  }
}
