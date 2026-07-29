import { access, readFile } from "node:fs/promises";
import path from "node:path";

export const REQUIRED_IMAGE_PATHS = [
  "public/images/hero-doctor.webp",
  "public/images/doctor-profile.webp",
  "public/images/clinic-map.webp",
] as const;

export interface AssetValidation {
  readonly path: string;
  readonly exists: boolean;
  readonly isWebp: boolean;
}

export async function validateRequiredImages(
  rootDirectory: string,
): Promise<readonly AssetValidation[]> {
  return Promise.all(
    REQUIRED_IMAGE_PATHS.map(async (relativePath) => {
      const absolutePath = path.join(rootDirectory, relativePath);
      try {
        await access(absolutePath);
        const bytes = await readFile(absolutePath);
        return {
          path: relativePath,
          exists: true,
          isWebp:
            bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
            bytes.subarray(8, 12).toString("ascii") === "WEBP",
        };
      } catch {
        return { path: relativePath, exists: false, isWebp: false };
      }
    }),
  );
}
