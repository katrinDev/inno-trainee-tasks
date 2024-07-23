import { supabase } from "../supabase/supabaseClient";

export default class ProjectsService {
  static async insertProject(project: AddProject) {
    return supabase.from("projects").insert(project).select();
  }

  static async getAllUserProjects(userId: string) {
    return supabase.from("projects").select("*").eq("user_id", userId);
  }

  static async deleteFile(fileName: string) {
    return supabase.from("projects").delete().eq("file_name", fileName);
  }
}
