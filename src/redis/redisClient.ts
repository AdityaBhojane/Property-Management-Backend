import { REDIS_PORT, REDIS_URL } from "../configs/severConfig";
import Redis from "ioredis";

export const redisClient = new Redis({
  host: REDIS_URL,
  port: Number(REDIS_PORT),
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err:any) => console.error("Redis error: ", err));