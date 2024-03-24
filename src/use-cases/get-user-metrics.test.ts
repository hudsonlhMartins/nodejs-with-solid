import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('Get user metrics use case', () => {

    let checkInsRepository: InMemoryCheckInsRepository
    let sut: GetUserMetricsUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        const userId = 'user-id'
        const checkIn = await checkInsRepository.create({
            gym_id: 'gym-id',
            user_id: userId
        })
 
        const { checkInsCounter } = await sut.execute({userId})

        expect(checkInsCounter).toEqual(1)
        
    })
})