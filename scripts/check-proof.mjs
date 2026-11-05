// Executed only inside check-offline.py's isolated /work mount.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createConnection } from "node:net";
import { spawnSync } from "node:child_process";

assert.equal(process.cwd(), "/work");
assert.equal(process.execPath, "/runtime/node");
const status = readFileSync("/proc/self/status", "utf8");
assert.match(status, /^NoNewPrivs:\s+1$/m);
assert.match(status, /^CapEff:\s+0+$/m);
for (const directory of ["/work", "/work/node_modules", "/runtime", "/usr"]) {
  assert.throws(
    () =>
      writeFileSync(`${directory}/.offline-write-probe`, "", { flag: "wx" }),
    (error) => error.code === "EROFS",
    `${directory} must be read-only`,
  );
}
for (const path of ["/home", "/root", "/etc/passwd", "/etc/resolv.conf"]) {
  assert.equal(
    existsSync(path),
    false,
    `${path} must not expose host configuration`,
  );
}
await new Promise((resolve, reject) => {
  const connection = createConnection({ host: "1.1.1.1", port: 443 });
  const timer = setTimeout(() => {
    connection.destroy();
    reject(Error("Network probe timed out"));
  }, 1500);
  connection.once("connect", () => {
    clearTimeout(timer);
    connection.destroy();
    reject(Error("Network is reachable"));
  });
  connection.once("error", (error) => {
    clearTimeout(timer);
    if (error.code === "ENETUNREACH") resolve();
    else reject(Error(`Expected ENETUNREACH, received ${error.code}`));
  });
});
console.log(
  JSON.stringify({
    sandbox_proof: "passed",
    read_only: true,
    no_new_privileges: true,
    effective_capabilities: 0,
    network: "ENETUNREACH",
    browser_qa: false,
  }),
);

const commands = [
  [
    "node_modules/vite/bin/vite.js",
    "build",
    "--configLoader",
    "native",
    "--ssr",
    "src/App.jsx",
    "--outDir",
    ".test-build",
  ],
  ["--test", "--test-concurrency=1", "tests/model.test.mjs"],
  [
    "node_modules/vite/bin/vite.js",
    "build",
    "--configLoader",
    "native",
    "--outDir",
    "dist",
  ],
];
for (const args of commands) {
  const result = spawnSync("/runtime/node", args, {
    stdio: ["ignore", "inherit", "inherit"],
    timeout: 180000,
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `Offline command failed: ${args.join(" ")}`);
}

// The standalone distribution must carry every applicable runtime/asset notice.
for (const name of [
  "LICENSE",
  "THIRD_PARTY_NOTICES.md",
  "licenses/react-MIT.txt",
  "licenses/react-dom-MIT.txt",
  "licenses/scheduler-MIT.txt",
  "licenses/vite-MIT.txt",
  "licenses/manrope-OFL.txt",
  "licenses/dm-sans-OFL.txt",
  "licenses/icons-LICENSE.txt",
]) {
  assert.ok(
    readFileSync("/work/dist/" + name, "utf8").length > 100,
    "Missing distribution license: " + name,
  );
  assert.equal(
    readFileSync("/work/dist/" + name, "utf8"),
    readFileSync("/work/" + name, "utf8"),
  );
}
console.log("Distribution licenses verified.");
