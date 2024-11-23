import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  MONGODB_URL: process.env.MONGODB_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};
