#!/usr/bin/env node
const path = require("path");
const readline = require("readline");
const fs = require("fs");

const stylesContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

.fill-screen {
  width: 100vw;
  height: 100vh;
}`;

const tailwindConfigContentd = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{js,html}"],
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    // extend: {
    //   colors: {
    //     light_greyish: "#cccccc",
    //     "new-color": "green",
    //   },
    // },
  },
  plugins: [],
};`;

const createHTMLBoilerplate = (title) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="./style.css" />
    <script defer src="./script.js"></script>
  </head>
  <body class="fill-screen bg-black">
    <!-- Your Code Goes Here -->    
  </body>
</html>`;
};

const readmeContents = (projectName) => `# ${projectName.toUpperCase()}\n
- Run: npx tailwindcss -i in.css -o style.css --watch 
`;

function writeAll(folderName) {
  const rootPath = path.resolve();
  const folderPath = path.join(rootPath, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  [
    ["index.html", createHTMLBoilerplate(folderName)],
    ["style.css", ""],
    ["in.css", stylesContent],
    ["tailwind.config.js", tailwindConfigContentd],
    ["script.js", ""],
    ["README.md", readmeContents(folderName)],
  ].forEach((file) => {
    writeFile(path.join(folderPath, file[0]), file[1]);
  });
}

function writeFile(filePath, contents) {
  fs.writeFile(filePath, contents, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
    }
  });
}

function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter Project Name: ", (name) => {
    writeAll(name);
    console.log(`\nRun: cd ${name}\n`);
    console.log(`\nRun: npx tailwindcss -i in.css -o style.css --watch\n`);
    rl.close();
  });
}

run();
