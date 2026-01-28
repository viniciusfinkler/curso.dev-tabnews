const { spawn } = require("child_process");

let done = false;

const cleanup = () => {
  if (done) return;
  done = true;

  console.log(`\n🔴 Parando container do Postgres`);
  spawn("npm", ["run", "services:stop"], { stdio: "inherit", shell: true }).on(
    "close",
    () => {
      console.log(`\n🟢 Container do Postgres parado com sucesso!`);
      process.exit();
    },
  );
};

process.on("SIGINT", () => cleanup());

spawn("npm", ["run", "dev:start"], { stdio: "inherit", shell: true }).on(
  "close",
  (code) => code && cleanup(),
);
