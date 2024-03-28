import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

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
    userLongitude,
  }: FeatchNearByGymsUseCaseProps): Promise<FeatchNearByGymsUseCaseResponse> {
    const gym = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gym,
    }
  }
}
