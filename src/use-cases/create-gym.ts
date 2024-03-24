import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'
import { GymsRepository } from '@/repositories/gyms-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, Prisma, User,  } from '@prisma/client'
import { hash } from 'bcryptjs'

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
    title
  }: CreateGymUsecaseProps): Promise<CreateGymUsecaseResponse> {
 


    const gym = await this.gymsRepository.create({
        description,
        latitude,
        longitude,
        phone,
        title
    })

    return {
      gym,
    }
  }
}
