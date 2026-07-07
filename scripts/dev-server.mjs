import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const preferredPort = Number(process.env.PORT || 5173);
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
]);

function createServer(port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    let filePath = decodeURIComponent(url.pathname);
    if (filePath === "/") filePath = "/index.html";
    const abs = path.normalize(path.join(root, filePath));
    if (!abs.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(abs, (err, data) => {
      if (err) {
        fs.readFile(path.join(root, "404.html"), (err404, data404) => {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end(err404 ? "404" : data404);
        });
        return;
      }
      res.writeHead(200, {
        "Content-Type":
          mime.get(path.extname(abs)) || "application/octet-stream",
      });
      res.end(data);
    });
  });
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") createServer(port + 1);
    else throw error;
  });
  server.listen(port, () => {
    console.log(`CONNECT Tech 2026 rodando em http://localhost:${port}`);
  });
}

createServer(preferredPort);
