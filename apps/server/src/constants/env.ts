import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) throw Error(`${key} value doesn't exist in environment variables`);
  return value;
}

const getNumberEnv = (key: string, defaultValue?: string): number => {
  const value = Number(getEnv(key, defaultValue));
  if (Number.isNaN(value)) throw Error(`${key} must be a valid number`);
  return value;
}

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getNumberEnv("PORT", "3000");
export const DATABASE_URL = getEnv("DATABASE_URL", "");
