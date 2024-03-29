import { LateCheckInValidationError } from '@/erros/late-check-in-validation-error'
import { ResourceNotExist } from '@/erros/resource-not-exists'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckinUseCaseProps {
  userId: string
  checkInId: string
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseProps): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotExist()

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    ) // retorna a diferença em minutos entre a data atual e a data de criação do check-in

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return {
      checkIn,
    }
  }
}
