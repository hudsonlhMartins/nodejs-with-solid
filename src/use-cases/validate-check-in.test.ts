import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { UserAlreadyCheckError } from '@/erros/user-already-check'
import { UserTooFarGym } from '@/erros/user-too-far-gym'
import { ValidateCheckinUseCase } from './validate-check-in'
import { ResourceNotExist } from '@/erros/resource-not-exists'


describe('Validate CheckIn Use Case', () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: ValidateCheckinUseCase
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new ValidateCheckinUseCase(inMemoryCheckInsRepository)

    gymsRepository.create({
      id: 'gym_id',
      title: 'Gym Name',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '123456789',
    })


    //vi.useFakeTimers()
  })

  afterEach(() => {
    //vi.useRealTimers()
  })
  it('should be able to validate check-in', async () => {

    const checkInData = await inMemoryCheckInsRepository.create({
        gym_id: 'gym_id',
        user_id: 'user_id',
    })

    const { checkIn } = await sut.execute({
        userId: 'user_id',
        checkInId: checkInData.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should be able to validate an inexistent check-in', async () => {

    const checkInData = await inMemoryCheckInsRepository.create({
        gym_id: 'gym_id',
        user_id: 'user_id',
    })

    

    await expect(async ()=>{
        await sut.execute({
            userId: 'user_id',
            checkInId: "112122"
        })
    }).rejects.toBeInstanceOf(ResourceNotExist)
  })

 
})
