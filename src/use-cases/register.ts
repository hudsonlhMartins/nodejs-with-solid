import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUserCaseProps {
  email: string
  password: string
  name: string
}

interface RegisterUserCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserCaseProps): Promise<RegisterUserCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    const password_hash = await hash(password, 6)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}
