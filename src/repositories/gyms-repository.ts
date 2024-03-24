import { Gym, Prisma, User } from '@prisma/client'

export interface FindManyNearByParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(id: string): Promise<Prisma.GymUncheckedCreateInput | null>
  create(data: Prisma.GymUncheckedCreateInput): Promise<Prisma.GymUncheckedCreateInput>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>

}
