import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FeatchNearByGymsUseCase } from './fetch-nearby-gyms'

describe('Fetch By Near Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FeatchNearByGymsUseCase
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FeatchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      description: 'description',
      latitude: -22.2104039,
      longitude: -41.671004,
      phone: '123456789',
      title: 'near gym',
    })
    await gymsRepository.create({
      description: 'description',
      latitude: -22.4721109,
      longitude: -42.1963846,
      phone: '123456789',
      title: 'far gym',
    })

    const { gym } = await sut.execute({
      userLatitude: -22.2104039,
      userLongitude: -41.671004,
    })

    expect(gym.length).toEqual(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
