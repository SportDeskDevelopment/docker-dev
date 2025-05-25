const path = require("path");
const concurrently = require("concurrently");

const args = process.argv.slice(2);
const isStudio = args.includes("--studio") || args.includes("-s");

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
    ...(isStudio ? [{
      name: "studio",
      command: "npx prisma studio",
      cwd: path.resolve(__dirname, "../backend/")
    }] : []),
  ],
  {
    killOthers: true,
  }
);

