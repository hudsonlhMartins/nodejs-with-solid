import { CheckIn, Prisma } from '@prisma/client';
import {CheckInsRepository} from '../check-ins-repository'
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckinsRepository implements CheckInsRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data
        })
        return checkIn
    }
    async findBtUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(), // gte means greater than or equal to
                    lte: endOfTheDay.toDate() // lte means less than or equal to
                }
            }
        })
        
        return checkIn

    }
    async findManyByUserId(userId: string, page?: number | undefined): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: page ? (page - 1) * 20 : 0
        })

        return checkIns
    }
    async countByUserId(userId: string): Promise<number> {
        const count = await prisma.checkIn.count({
            where: {
                user_id:userId
            }
        })

        return count
    }
    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            
            }
        })

        return checkIn
    }
    async save(checkIn: CheckIn): Promise<CheckIn> {
        const updatedCheckIn = await prisma.checkIn.update({
            where: {
                id: checkIn.id
            },
            data: checkIn
        })

        return updatedCheckIn
    }

}