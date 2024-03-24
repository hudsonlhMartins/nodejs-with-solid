import { describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotExist } from '@/erros/resource-not-exists'
import { hash } from 'bcryptjs'

describe('GetUserProfile', () => {
  it('should be able to get user profile', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
    await usersRepository.create({
      name: 'John Doe',
      email: 'joedoen@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({ userId: 'user-1' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should throw ResourceNotExist when user is not found', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
    expect(async () => {
      await getUserProfileUseCase.execute({ userId: 'user-2' })
    }).rejects.toBeInstanceOf(ResourceNotExist)
  })
})
