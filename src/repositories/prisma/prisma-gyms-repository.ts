import { Gym, Prisma } from '@prisma/client'
import { FindManyNearByParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Prisma.GymUncheckedCreateInput | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(
    data: Prisma.GymUncheckedCreateInput,
  ): Promise<Prisma.GymUncheckedCreateInput> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: page ? (page - 1) * 20 : 0,
    })

    return gyms
  }

  async findManyNearBy({
    latitude,
    longitude,
  }: FindManyNearByParams): Promise<Gym[]> {
    // fazer o sql na mao
    const gym = await prisma.$queryRaw<Gym[]>`
             SELECT * from gyms
                WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

    return gym
  }
}
