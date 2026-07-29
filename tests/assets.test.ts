import { describe, expect, it } from "vitest";
import { validateRequiredImages } from "@/lib/assets";

describe("required homepage images", () => {
  it("finds three decodable WebP assets", async () => {
    const results = await validateRequiredImages(process.cwd());
    expect(results).toHaveLength(3);
    expect(results.every((result) => result.exists && result.isWebp)).toBe(true);
  });
});
