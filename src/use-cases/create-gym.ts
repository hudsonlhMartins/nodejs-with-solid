import { GymsRepository } from '@/repositories/gyms-repository'
import { Prisma } from '@prisma/client'

interface CreateGymUsecaseProps {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUsecaseResponse {
  gym: Prisma.GymUncheckedCreateInput
}

export class CreateGymUsecase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUsecaseProps): Promise<CreateGymUsecaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    })

    return {
      gym,
    }
  }
}
