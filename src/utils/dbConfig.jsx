import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://salamadb_owner:npg_CbMlExs8jh1v@ep-jolly-cell-a9xssdhh-pooler.gwc.azure.neon.tech/salamadb?sslmode=require",
);
export const db = drizzle(sql, { schema });
