import z from 'zod';

const envSchema=z.object({
  NODE_ENV:z.enum(["development","test","production"]),
  PORT:z.coerce.number().default(3000),
  MONGO_URL:z.string().url(),
  REDIS_URL:z.string().url(),
  JWT_SECRET:z.string().min(32),
  JWT_EXPIRES_IN:z.string().default("15m"),
  COOKIE_SECRET:z.string().min(32),
  ALLOWED_ORIGINS:z.string().transform(s=>s.split(","))
})

const parsed= envSchema.safeParse(process.env);

if(!parsed.success){
  console.error("Invalid environment variable:", parsed.error.format());
  process.exit(1)
}

export const env = parsed.data
