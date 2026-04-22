import { DATABASE_URL } from "../constants/env.js";

export const hasDatabaseConfig = DATABASE_URL.length > 0;
