import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (file: string) => readFileSync(join(root, file), "utf8");

describe("delivery contracts", () => {
  it("keeps the service worker on the public shell allowlist", () => {
    const worker = read("public/sw.js");
    expect(worker).toContain(
      'request.mode === "navigate" && new URL(request.url).pathname !== "/"',
    );
    expect(worker).not.toContain("request.mode === 'navigate' ||");
    expect(worker).toContain('"/icons/icon-192.png"');
  });

  it("ships local install icons and manifest sizes", () => {
    expect(existsSync(`${root}/public/icons/icon-192.png`)).toBe(true);
    expect(existsSync(`${root}/public/icons/icon-512.png`)).toBe(true);
    const manifest = JSON.parse(read("public/manifest.webmanifest")) as {
      icons: Array<{ sizes: string }>;
    };
    expect(manifest.icons.map((icon) => icon.sizes)).toEqual([
      "192x192",
      "512x512",
    ]);
  });

  it("documents explicit migration deployment and ignores build secrets", () => {
    expect(read(".dockerignore")).toContain(".env");
    expect(read("README.md")).toContain("prisma migrate deploy");
    expect(read("docker-compose.yml")).toContain(
      "DATABASE_URL:?set DATABASE_URL",
    );
  });
});
