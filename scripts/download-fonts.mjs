import fs from "fs";
import path from "path";
import https from "https";

const fontDir = path.join(process.cwd(), "public", "fonts");
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log("Downloading Inter fonts...");
  await download(
    "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
    path.join(fontDir, "inter-latin.woff2")
  );
  await download(
    "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2",
    path.join(fontDir, "inter-latin-ext.woff2")
  );
  console.log("Fonts downloaded successfully!");
}

run().catch(console.error);
