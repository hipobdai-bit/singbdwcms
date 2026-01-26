import { getAdminBucket } from "@/lib/firebaseAdmin";

function sanitizeFilename(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
}

export async function uploadImageToStorage(
  file: File,
  folder: string,
  baseName?: string
) {
  const bucket = getAdminBucket();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const originalName = file.name || "image";
  const extension = originalName.includes(".")
    ? originalName.split(".").pop()
    : "";
  const safeBase = sanitizeFilename(baseName || originalName.replace(/\.[^/.]+$/, ""));
  const finalName = `${folder}/${Date.now()}-${safeBase || "image"}${
    extension ? `.${extension}` : ""
  }`;
  const storageFile = bucket.file(finalName);

  await storageFile.save(buffer, {
    contentType: file.type || "application/octet-stream",
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  // Make the file publicly accessible
  await storageFile.makePublic();

  // Return the public URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(finalName).replace(/%2F/g, '/')}`;
  
  return publicUrl;
}
