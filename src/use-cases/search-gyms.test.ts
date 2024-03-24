import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

describe('Search Gyms Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase
  beforeEach(() => {

    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '123456789',
        title: 'Gym Name'
    })
    await gymsRepository.create({
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '123456789',
        title: 'Gym Name'
    })
    await gymsRepository.create({
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '123456789',
        title: 'Gym magal'
    })

    const { gym } = await sut.execute({
        query: 'Gym Name',
    })

    expect(gym.length).toEqual(2)
  })

  it('should be able to search gyms paged', async () => {

    for(let i = 0; i < 30; i++) {
        await gymsRepository.create({
            description: 'description',
            latitude: 0,
            longitude: 0,
            phone: '123456789',
            title: 'Gym Name'
        })
    }

   
    const { gym } = await sut.execute({
        query: 'Gym Name',
        page: 2
    })

    expect(gym.length).toEqual(10)
  
  })
})
