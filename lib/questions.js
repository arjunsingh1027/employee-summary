// employee questions
const questions = [
    {
        name: "name",
        message: "Employee name: ",
    },
    {
        name: "id",
        message: "Employee ID: ",
    },
    {
        name: "employeeType",
        message: "What type of employee do you want to add?",
        type: "list",
        choices: ["Engineer", "Intern", "Manager"],
    },
    {
        name: "github",
        message: "What is the engineer's GitHub username?",
        when: (answers) => answers.employeeType === "Engineer",
    },
    {
        name: "school",
        message: "Where does the intern go to school?",
        when: (answers) => answers.employeeType === "Intern",
    },
    {
        name: "another",
        message: "Do you want to add another employee?",
        type: "confirm",
        default: "true"
    },
];

module.exports = questions;