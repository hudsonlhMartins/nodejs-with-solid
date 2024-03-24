import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'
import { GymsRepository } from '@/repositories/gyms-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, Prisma, User,  } from '@prisma/client'
import { hash } from 'bcryptjs'

export interface FeatchNearByGymsUseCaseProps {
    userLatitude: number
    userLongitude: number
}


interface FeatchNearByGymsUseCaseResponse {
  gym: Gym[]
}

export class FeatchNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
  userLatitude,
  userLongitude
  }: FeatchNearByGymsUseCaseProps): Promise<FeatchNearByGymsUseCaseResponse> {
    const gym = await this.gymsRepository.findManyNearBy({latitude: userLatitude, longitude: userLongitude})

    return {
      gym,
    }
  }
}
