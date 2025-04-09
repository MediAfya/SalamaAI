// src/utils/dbConfig.jsx
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Database connection configuration
const sql = neon(
  "postgresql://salamadb_owner:npg_CbMlExs8jh1v@ep-jolly-cell-a9xssdhh-pooler.gwc.azure.neon.tech/salamadb?sslmode=require"
);

// Drizzle ORM setup with Neon
export const db = drizzle(sql, { schema });
