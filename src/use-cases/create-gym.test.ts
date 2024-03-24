import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUsecase } from './create-gym'

describe('Create Gym Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUsecase
  beforeEach(() => {

    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUsecase(gymsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '123456789',
        title: 'Gym Name'
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
