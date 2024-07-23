import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default class StorageService {
  static bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
  static folderName = import.meta.env.VITE_SUPABASE_STORAGE_PROJECTS_FOLDER;

  static async fileUpload(blob: Blob) {
    const fileName = `canvas-${uuidv4()}.png`;
    const file = new File([blob], `${fileName}`, {
      type: "image/png",
    });

    return supabase.storage
      .from(this.bucketName)
      .upload(`${this.folderName}/${fileName}`, file);
  }

  static async getFileUrl(fileName: string) {
    return supabase.storage
      .from(this.bucketName)
      .getPublicUrl(`${this.folderName}/${fileName}`);
  }

  static async downloadFile(fileName: string) {
    return supabase.storage
      .from(this.bucketName)
      .download(`${this.folderName}/${fileName}`);
  }
}
