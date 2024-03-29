import { ResourceNotExist } from '@/erros/resource-not-exists'
import { UserAlreadyCheckError } from '@/erros/user-already-check'
import { UserTooFarGym } from '@/erros/user-too-far-gym'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'
import { CheckIn } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

interface CheckinUseCaseProps {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseProps): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotExist()
    }

    // calcular a distacia entre o usuario e a academia, se for maior que 100m, lançar um erro
    const { latitude, longitude } = gym
    const _latitude = latitude as Decimal
    const _longitude = longitude as Decimal
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: _latitude.toNumber(), longitude: _longitude.toNumber() },
    )

    const MAX_DISTANCE_IN_KIlOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KIlOMETERS) {
      throw new UserTooFarGym()
    }

    const sheckInOnSameDay = await this.checkInsRepository.findBtUserIdOnDate(
      userId,
      new Date(),
    )

    if (sheckInOnSameDay) {
      throw new UserAlreadyCheckError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
