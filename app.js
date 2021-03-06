const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const teamIds = [];

function appMenu() {
    function createManager() {
        console.log("Build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                // validate name input
                validate: function (answer) {
                    if (answer !== "") {
                        return true;
                    } return "please enter a name"
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID?",
                // RegEx validation for numbers
                validate: function (answer) {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    } return "please enter a number greater than 0"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                // RegEx validation for numbers
                validate: function (answer) {
                    const pass = answer.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
                    if (pass) {
                        return true;
                    } return "please enter a valid email"
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                // RegEx validation for numbers
                validate: function (answer) {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    } return "please enter a number greater than 0"
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            teamIds.push(answers.managerId);
            createTeam()
        });

    };

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamChoice",
                message: "which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add another member"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.teamChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    buildTeam();
            }
        })
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                // validate name input
                validate: function (answer) {
                    if (answer !== "") {
                        return true;
                    } return "please enter a name"
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's ID?",
                // RegEx validation for numbers
                validate: function (answer) {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    } return "please enter a number greater than 0"
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                // RegEx validation for email
                validate: function (answer) {
                    const pass = answer.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
                    if (pass) {
                        return true;
                    } return "please enter a valid email"
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub username?",
                // RegEx validation for numbers
                validate: function (answer) {
                    if (answer !== "") {
                        return true;
                    } return "please enter a GitHub username"
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            teamIds.push(answers.engineerId);
            createTeam();
        });
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                // validate name input
                validate: function (answer) {
                    if (answer !== "") {
                        return true;
                    } return "please enter a name"
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's ID?",
                // RegEx validation for numbers
                validate: function (answer) {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    } return "please enter a number greater than 0"
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                // RegEx validation for email
                validate: function (answer) {
                    const pass = answer.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
                    if (pass) {
                        return true;
                    } return "please enter a valid email"
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                // RegEx validation
                validate: function (answer) {
                    if (answer !== "") {
                        return true;
                    } return "please enter a school"
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            teamIds.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }
    createManager();
}

appMenu();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
