import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
const folderName = import.meta.env.VITE_SUPABASE_STORAGE_PROJECTS_FOLDER;

export async function fileUpload(blob: Blob) {
  const fileName = `canvas-${uuidv4()}.png`;
  const file = await convertBlobToFile(blob, fileName);

  return supabase.storage
    .from(bucketName)
    .upload(`${folderName}/${fileName}`, file);
}

export async function getFileUrl(fileName: string) {
  return supabase.storage
    .from(bucketName)
    .getPublicUrl(`${folderName}/${fileName}`);
}

export async function downloadFile(fileName: string) {
  return supabase.storage
    .from(bucketName)
    .download(`${folderName}/${fileName}`);
}

export async function updateFile(fileName: string, blob: Blob) {
  const file = await convertBlobToFile(blob, fileName);

  return supabase.storage
    .from(bucketName)
    .update(`${folderName}/${fileName}`, file);
}

export async function deleteFile(fileName: string) {
  return supabase.storage
    .from(bucketName)
    .remove([`${folderName}/${fileName}`]);
}

export async function convertBlobToFile(blob: Blob, fileName: string) {
  return new File([blob], `${fileName}`, {
    type: "image/png",
  });
}
