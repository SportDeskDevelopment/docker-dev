const path = require("path");
const concurrently = require("concurrently");

concurrently(
  [
    {
      name: "db",
      command: "docker compose up -d",
      cwd: path.resolve(__dirname),
    },
    {
      name: "backend",
      command: "npm run start:debug",
      cwd: path.resolve(__dirname, "../backend/"),
    },
    {
      name: "web",
      command: "npm run dev",
      cwd: path.resolve(__dirname, "../web/"),
    },
  ],
  {
    killOthers: true,
  }
);

