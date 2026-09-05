import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

function findSourceFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findSourceFiles(fullPath));
    } else if (/\.(tsx|ts|jsx|js|mjs)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const sourceFiles = findSourceFiles(srcDir);

// 1. Collect all declared DOM IDs
const declaredIds = new Set();
const idRegex = /\bid=["']([^"']+)["']/g;

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf-8");
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    declaredIds.add(match[1]);
  }
}

// Also add dynamically generated IDs and special SVG targets if present
declaredIds.add("marqueeCirclePath");
declaredIds.add("circle-path");

console.log(`[check-links] Total declared DOM IDs found: ${declaredIds.size}`);
console.log(`[check-links] Key IDs: ${Array.from(declaredIds).slice(0, 15).join(", ")}...`);

// 2. Scan for internal hash links in hrefs
const hashRegex = /href(?::|=)["'](#[a-zA-Z0-9_-]+)["']/g;
const brokenLinks = [];
let totalLinksChecked = 0;

for (const file of sourceFiles) {
  const relativePath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, lineIndex) => {
    let match;
    while ((match = hashRegex.exec(line)) !== null) {
      const hash = match[1];
      const targetId = hash.slice(1);
      totalLinksChecked++;

      // Check if targetId is in declaredIds
      if (!declaredIds.has(targetId)) {
        brokenLinks.push({
          file: relativePath,
          line: lineIndex + 1,
          hash,
          snippet: line.trim(),
        });
      }
    }
  });
}

console.log(`[check-links] Checked ${totalLinksChecked} internal hash links.`);

if (brokenLinks.length > 0) {
  console.error(`\n❌ [check-links] FOUND ${brokenLinks.length} BROKEN INTERNAL LINKS:`);
  for (const item of brokenLinks) {
    console.error(`  - ${item.file}:${item.line} -> "${item.hash}" (Target id="${item.hash.slice(1)}" not found in DOM)`);
    console.error(`    Code: ${item.snippet}\n`);
  }
  process.exit(1);
} else {
  console.log(`✅ [check-links] All ${totalLinksChecked} internal links correctly match valid DOM IDs! 0 broken links.\n`);
  process.exit(0);
}
