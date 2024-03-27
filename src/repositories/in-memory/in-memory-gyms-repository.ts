import { Gym, Prisma, User } from '@prisma/client'
import { FindManyNearByParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'

export class InMemoryGymsRepository implements GymsRepository {
  constructor(private items: Gym[] = []) {}

    async create(data: Prisma.GymUncheckedCreateInput): Promise<Prisma.GymUncheckedCreateInput> {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description as string,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone as string,
        }
        this.items.push(gym)
        return gym
    }
  async findById(id: string): Promise<Prisma.GymUncheckedCreateInput | null> {
    return this.items.find((gym) => gym.id === id) || null
  }
  async searchMany(query: string, page: number): Promise<Gym[]> {
    
      return this.items.filter((gym) => gym.title.includes(query)).slice((page-1) * 20, page * 20)
  }

  async findManyNearBy(params: FindManyNearByParams): Promise<Gym[]> {
      const { latitude, longitude } = params
      const gymsNear = this.items.filter((gym) => {
        const distance = getDistanceBetweenCoordinates(
          {latitude, longitude},
          {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        return distance < 10
      })
      return gymsNear
  }
}
