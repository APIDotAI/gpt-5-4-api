import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnv(resolve(__dirname, "../.env"));
loadDotEnv(resolve(__dirname, ".env"));

const API_KEY = process.env.APIDOT_API_KEY;
const BASE_URL = process.env.APIDOT_BASE_URL || "https://api.apidot.ai";

if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
  console.error("Set APIDOT_API_KEY before running this example.");
  process.exit(1);
}

const payload = {
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "system",
      "content": "You are a professional workflow assistant."
    },
    {
      "role": "user",
      "content": "Review this quarterly spreadsheet narrative. Identify formula assumptions to verify, finance risks, and the next checks an analyst should run."
    }
  ],
  "max_tokens": 1024
};

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok || (body && typeof body === "object" && body.code >= 400)) {
    throw new Error("APIDot request failed: " + JSON.stringify(body));
  }
  return body;
}

async function main() {
  const result = await requestJson(BASE_URL + "/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
