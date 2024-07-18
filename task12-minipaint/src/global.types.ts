import type { Database as DB, Tables } from "./supabase/database.types";

declare global {
  export type Database = DB;
  export type Country = Tables<"countries">;
}
