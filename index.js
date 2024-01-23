const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Use dynamic import for inquirer
let inquirer;
try {
    inquirer = require("inquirer");
  } catch (error) {
    console.error("Failed to require inquirer:", error);
    process.exit(1);
  }

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

async function promptManager() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the manager's email address:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
    },
  ]);

  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  teamMembers.push(manager);
  await promptTeamMember();
}

async function promptEngineer() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the engineer's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the engineer's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the engineer's email address:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's GitHub username:",
    },
  ]);

  const engineer = new Engineer(
    answers.name,
    answers.id,
    answers.email,
    answers.github
  );
  teamMembers.push(engineer);
  await promptTeamMember();
}

async function promptIntern() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the intern's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the intern's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the intern's email address:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
    },
  ]);

  const intern = new Intern(
    answers.name,
    answers.id,
    answers.email,
    answers.school
  );
  teamMembers.push(intern);
  await promptTeamMember();
}

async function promptTeamMember() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Select the role of the team member:",
      choices: ["Engineer", "Intern", "Finish building the team"],
    },
  ]);

  switch (answers.role) {
    case "Engineer":
      await promptEngineer();
      break;
    case "Intern":
      await promptIntern();
      break;
    case "Finish building the team":
      renderHTML();
      break;
  }
}

function renderHTML() {
  const html = render(teamMembers);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, html);
  console.log(`Team HTML generated successfully! Check ${outputPath}`);
}

// Start by prompting for the manager
(async () => {
    // Start by prompting for the manager
    await promptManager();
  })();