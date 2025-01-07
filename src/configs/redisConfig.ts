import { REDIS_PORT, REDIS_URL } from "./severConfig";
import Redis from "ioredis";

export const redisConfig = {
    host:REDIS_URL,
    port:REDIS_PORT
}



const redis = new Redis(redisConfig);


redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});
