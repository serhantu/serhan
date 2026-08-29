// Cloudflare R2 integration (S3-compatible object storage).
//
// Provides upload and delete operations for images. R2 is accessed via the
// standard AWS S3 SDK using Cloudflare's S3-compatible endpoint.
//
// When R2 credentials are not configured the helpers throw eagerly so callers
// can fail fast during development.

import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

let cached: S3Client | null = null;

function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 credentials are not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in your environment.",
    );
  }

  if (!cached) {
    cached = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  return cached;
}

function getBucket(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("R2_BUCKET_NAME is not configured.");
  return bucket;
}

function getPublicUrl(): string {
  const url = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");
  if (!url) throw new Error("R2_PUBLIC_URL is not configured.");
  return url;
}

/**
 * Check whether R2 credentials are available in the environment.
 * Non-throwing — useful to conditionally disable upload UI.
 */
export function isR2Configured(): boolean {
  return !!(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    process.env.R2_PUBLIC_URL
  );
}

/**
 * Upload a file to R2. Returns the public URL of the uploaded object.
 *
 * @param file - Raw file bytes
 * @param key - Object key (path within the bucket), e.g. "images/1234.webp"
 * @param contentType - MIME type, e.g. "image/webp"
 */
export async function uploadToR2(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string,
): Promise<string> {
  const client = getR2Client();
  const bucket = getBucket();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    }),
  );

  return `${getPublicUrl()}/${key}`;
}

/**
 * Delete a file from R2 by its object key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();
  const bucket = getBucket();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}
