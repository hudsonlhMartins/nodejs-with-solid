import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

/**
 * Esse query ele vaio mostrar no terminal as query que o prisma fez
 */
