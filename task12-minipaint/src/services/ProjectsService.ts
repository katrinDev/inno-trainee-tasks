import { supabase } from "../supabase/supabaseClient";

export default class ProjectsService {
  static insertProject(project: AddProject) {
    return supabase.from("projects").insert(project).select();
  }

  static getAllUserProjects(userId: string) {
    return supabase.from("projects").select("*").eq("user_id", userId);
  }
}
