import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

const generateDatabaseURL = (schema: string) => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  await redis.flushdb()

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
