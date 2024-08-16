const fs = require("fs");
const path = require("path");
const readline = require("readline");

function createHTMLBoilerplate(title) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="./style.css" />
    <script defer src="./script.js"></script>
  </head>
  <body>
    
  </body>
</html>
`;
}

function createProjectBoilerPlate(folderName) {
  const folderPath = path.join(__dirname, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, "index.html");
  const content = createHTMLBoilerplate(folderName);
  const styles_content = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  `;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      // console.log("File created successfully:", filePath);
    }
  });

  const filePath2 = path.join(folderPath, "style.css");

  fs.writeFile(filePath2, styles_content, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      // console.log("File created successfully:", filePath2);
    }
  });

  const filePath3 = path.join(folderPath, "script.js");

  fs.writeFile(filePath3, "", (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      // console.log("File created successfully:", filePath3);
    }
  });

  const filePath4 = path.join(folderPath, "tailwind.config.js");
  const tailwindContent = `
  /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./*.{js,html}"],
      theme: {
        extend: {},
      },
      plugins: [],
  }
  `;
  fs.writeFile(filePath4, tailwindContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      // console.log("File created successfully:", filePath4);
    }
  });

  const filePath5 = path.join(folderPath, "in.css");
  const inStyle = `
@tailwind base;
@tailwind components;
@tailwind utilities;

  `;
  fs.writeFile(filePath5, inStyle, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      // console.log("File created successfully:", filePath5);
    }
  });
}

function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter Project Name: ", (name) => {
    createProjectBoilerPlate(name);
    console.log(`\nRun: cd ${name}\n`);
    console.log(`\nRun: npx tailwindcss -i in.css -o style.css --watch\n`);
    rl.close();
  });
}

run();
