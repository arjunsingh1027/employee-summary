// variables for manager
const Manager = require("./Manager")

// create manager class with user inputs
const createManager = ({
    name, id, email, officeNumber
}) => {
    return new Manager(name, id, email, officeNumber)
}

// export
module.exports = createManager;