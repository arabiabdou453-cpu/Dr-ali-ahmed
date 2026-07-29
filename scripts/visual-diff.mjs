import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const [, , referencePath, actualPath, diffPath] = process.argv;
if (!referencePath || !actualPath || !diffPath) {
  throw new Error("Expected reference, actual, and diff paths.");
}

const reference = PNG.sync.read(fs.readFileSync(referencePath));
const actual = PNG.sync.read(fs.readFileSync(actualPath));
if (reference.width !== actual.width || reference.height !== actual.height) {
  throw new Error("Reference and implementation dimensions must match.");
}

const diff = new PNG({ width: reference.width, height: reference.height });
const mismatchedPixels = pixelmatch(
  reference.data,
  actual.data,
  diff.data,
  reference.width,
  reference.height,
  { threshold: 0.1, includeAA: true, diffColor: [255, 0, 64] },
);
fs.mkdirSync(path.dirname(diffPath), { recursive: true });
fs.writeFileSync(diffPath, PNG.sync.write(diff));
process.stdout.write(`${JSON.stringify({ mismatchedPixels })}\n`);
