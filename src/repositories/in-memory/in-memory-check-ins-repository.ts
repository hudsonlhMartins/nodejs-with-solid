import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  constructor(private checkIns: CheckIn[] = []) {}

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)
    return checkIn
  }

  async findBtUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {

    const startOfDay = dayjs(date).startOf('date')
    /*
      isso vai retorna a data de hoje no formato 2021-01-01T00:00:00Z, tipo o começo do dia, retorna os segundos e minutos como 00:00:00
    */
      const endOfDay = dayjs(date).endOf('date')
      /*
        isso vai retorna a data de hoje no formato 2021-01-01T23:59:59Z, tipo o final do dia, retorna os segundos e minutos como 23:59:59
      */


    const checInOnSameDate = this.checkIns.find((el) => {
      const checkInDate = dayjs(el.created_at)
      const isOnSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)
      /*
        isso vai retorna true se a data do checkIn for depois do começo do dia e antes do final do dia
      */

      return el.user_id === userId && isOnSameDay 
    })
    if (!checInOnSameDate) return null
    return checInOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
      return this.checkIns.filter((el) => el.user_id === userId).slice((page - 1)*20, page * 20)
  }
  async countByUserId(userId: string): Promise<number> {
    return Promise.resolve(this.checkIns.filter((el) => el.user_id === userId).length)
  }

  async findById(id: string): Promise<CheckIn | null> {
      return this.checkIns.find((el) => el.id === id) || null
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
      const index = this.checkIns.findIndex((el) => el.id === checkIn.id)
      if(index === -1) return checkIn
      this.checkIns[index] = checkIn
      return checkIn
  }
}
