import {describe, it, expect, beforeEach} from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

describe('FetchUserCheckInsUseCase', () => {

    let checkInsRepository: InMemoryCheckInsRepository
    let sut: FetchUserCheckInsHistoryUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })

    it('should be able to fetch user check ins', async () => {
        const userId = 'user-id'
        const checkIn = await checkInsRepository.create({
            gym_id: 'gym-id',
            user_id: userId
        })
 
        const { checkIns } = await sut.execute({userId})

        expect(checkIns).toHaveLength(1)
        expect(checkIns).toEqual([checkIn])
    })

    it('should be able to fetch paginated check-in check ins', async () => {
        const userId = ''

        for (let i = 0; i < 22; i++) {
            await checkInsRepository.create({
                gym_id: 'gym-id_'+i,
                user_id: userId
            })
        } 

 
        const { checkIns } = await sut.execute({userId, page: 2})

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-id_20'}),
            expect.objectContaining({gym_id: 'gym-id_21'}),
        ])
    })
})