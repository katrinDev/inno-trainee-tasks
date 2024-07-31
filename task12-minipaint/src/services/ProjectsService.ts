import { supabase } from "../supabase/supabaseClient";

export async function insertProject(project: AddProject) {
  return supabase.from("projects").insert(project).select();
}

export async function getAllUserProjects(userId: string) {
  return supabase.from("projects").select("*").eq("user_id", userId);
}

export async function deleteFile(fileName: string) {
  return supabase.from("projects").delete().eq("file_name", fileName);
}
