import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/erros/user-already-exists-error'

describe('Register Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterUserCase
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUserCase(inMemoryUsersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jphndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jphndoe@example.com',
      password: '123456',
    })
   
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow two users with the same email to be registered', async () => {
    const email = 'jphndoe@example.com'
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '1234456',
    })

    expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '1234456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
