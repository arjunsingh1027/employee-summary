// external variables
const Engineer = require("./Engineer");
const Intern = require("./Intern");

// create employee class with user inputs
const createEmployee = ({
    name,
    id,
    email,
    employeeType,
    github,
    school,
    another,
}) => {
    // variable to keep data
    let employee = {};
    // creating employee class
    if (employeeType === "Engineer") {
        employee = new Engineer(name, id, email, github);
    }
    if (employeeType === "Intern") { 
        employee = new Intern(name, id, email, school);
    }

    return employee;
};

module.exports = createEmployee;