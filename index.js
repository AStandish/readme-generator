// TODO: Include packages needed for this application
// Packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "name",
    message:
      "Welcome to the README generator! Please provide your first and last name:",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please provide your GitHub username:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address:",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please enter your email:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Please enter your project title:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Enter your project description here:",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log(
          'Please provide a project description. Not sure what to include? Head to the repo of this README generator and navigate to the section "Description: Questions to Consider" under the Guidelines header for some tips on writing a quality description.'
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message: "Please provide the instructions for installation?",
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log("Please provide instructions for installation:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Instructions for usage:",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please provide instructions for usage:.");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "contributing",
    message: "How can others contribute to this project?",
    validate: (contributionInput) => {
      if (contributionInput) {
        return true;
      } else {
        console.log(
          "Please provide instructions on how others can contribute to your project:"
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "tests",
    message:
      "Describe the tests written for your application and how to use them:",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        console.log(
          "Please provide tests written for your application and how to use them:"
        );
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmLicenses",
    message: "Would you like to include a license?",
    default: false,
  },
  {
    type: "list",
    name: "licenses",
    message: "What license would you like to include?",
    choices: ["MIT", "GPL", "CC--0"],
    when: ({ confirmLicenses }) => {
      if (confirmLicenses) {
        return true;
      } else {
        return false;
      }
    },
  },
];

// TODO: Create a function to write README file
function writeToFile(data) {
  return new Promise((resolve, reject) => {
    // make a readme file and add to dist folder
    fs.writeFile("./dist/README.md", data, (err) => {
      // if there's an error, reject the Promise and send the error to .catch() method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't continue to execute the resolve() function
        return;
      }
      // if everything went well, resolve the Promise and send the successful data to the .then() method
      resolve({
        ok: true,
        message: console.log(
          'Great job! Navigate to the "dist" folder to see your README!'
        ),
      });
    });
  });
}

// TODO: Create a function to initialize app
function init() {
  return inquirer.prompt(questions);
}

// Function call to initialize app
init()
  .then((userInput) => {
    return generateMarkdown(userInput);
  })
  .then((readmeInfo) => {
    return writeToFile(readmeInfo);
  })
  .catch((err) => {
    console.log(err);
  });
