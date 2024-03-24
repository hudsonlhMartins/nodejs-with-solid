import { ResourceNotExist } from '@/erros/resource-not-exists'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseProps {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseProps): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotExist()
    }

    return {
      user,
    }
  }
}
