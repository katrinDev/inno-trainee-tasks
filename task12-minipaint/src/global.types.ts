import type { Database as DB, Tables } from "./supabase/database.types";

declare global {
  export type Database = DB;
  export type Project = Tables<"projects">;
  export type AddProject = Omit<Project, "id">;
}
