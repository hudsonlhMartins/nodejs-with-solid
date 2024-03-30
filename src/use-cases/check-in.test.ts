import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckinUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { UserAlreadyCheckError } from '@/erros/user-already-check'
import { UserTooFarGym } from '@/erros/user-too-far-gym'


describe('CheckIn Use Case', () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckinUseCase
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(inMemoryCheckInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym_id',
      title: 'Gym Name',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '123456789',
    })


    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date('2021-01-01T12:00:00Z'))
    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym_id',
        userId: 'user_id',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(UserAlreadyCheckError)
  })

  it('should be able to check-in in twice but in different days', async () => {
    vi.setSystemTime(new Date('2021-01-01T12:00:00Z'))
    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date('2021-01-02T12:00:00Z'))
    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn).toEqual(expect.any(Object))
  })

  it('should not be able to check-in in on distant gyms', async () => {

    gymsRepository.create({
      id: 'gym_id_2',
      title: 'Gym Name',
      latitude: new Decimal(-22.3908348),
      longitude: new Decimal(-41.8096205),
      phone: '123456789',
    })

 
    vi.setSystemTime(new Date('2021-01-01T12:00:00Z'))
   
    await expect(async ()=>{
      await sut.execute({
        gymId: 'gym_id_2',
        userId: 'user_id',
        userLatitude:  -22.3381027,
        userLongitude: -41.7529428,
      })
    }).rejects.toBeInstanceOf(UserTooFarGym)
  })

})
