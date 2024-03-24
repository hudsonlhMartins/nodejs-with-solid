import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'
import { GymsRepository } from '@/repositories/gyms-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, Prisma, User,  } from '@prisma/client'
import { hash } from 'bcryptjs'

interface SearchGymsUseCaseProps {
    query: string
    page?: number
}


interface SearchGymsUseCaseResponse {
  gym: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
   query,
   page=1
  }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gym = await this.gymsRepository.searchMany(query, page)

    return {
      gym,
    }
  }
}
