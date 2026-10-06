import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import path from "path";

const PUBLIC = path.join(process.cwd(), "public");

async function compressPng(file, maxWidth) {
  const input = path.join(PUBLIC, file);
  const before = statSync(input).size;
  const meta = await sharp(input).metadata();
  const width = Math.min(meta.width ?? maxWidth, maxWidth);
  const buf = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  const outPath = input.replace(/\.png$/i, ".webp");
  await sharp(buf).toFile(outPath);
  console.log(`${file} -> ${path.basename(outPath)}: ${before}B -> ${buf.length}B`);
}

async function compressJpg(file, maxWidth) {
  const input = path.join(PUBLIC, "results", file);
  const before = statSync(input).size;
  const meta = await sharp(input).metadata();
  const width = Math.min(meta.width ?? maxWidth, maxWidth);
  const buf = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
  const outPath = input.replace(/\.jpe?g$/i, ".webp");
  await sharp(buf).toFile(outPath);
  console.log(`results/${file} -> ${path.basename(outPath)}: ${before}B -> ${buf.length}B`);
}

await compressPng("roadmap-amenagement-preview.png", 560 * 2); // 2x for retina
await compressPng("reachflow-logo-light-text.png", 200 * 2);

const resultsFiles = readdirSync(path.join(PUBLIC, "results")).filter((f) => /\.jpe?g$/i.test(f));
for (const f of resultsFiles) {
  await compressJpg(f, 1200);
}
