const inquirer = require('inquirer');
const connect = require('../config/connection');


const viewDB = () => {
    inquirer
    .prompt ({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to view?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    })
    .then((answer) => {
        switch(answer.action) {
            case 'Departments':
                viewDepts();
                break;

            case 'Roles':
                viewRoles();
                break; 

            case 'Employees':
                viewEmployees();
                break; 
            
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};

const viewDepts = () => {
    const query = 'SELECT name FROM department';
    connect.query(query, (err, res) => {
        if(err) throw err;
        res.forEach(({name}) => console.log(name));
        quit();
    });
};

const viewRoles = () => {
    const query = 'SELECT title FROM role';
    connect.query(query, (err, res) => {
        if(err) throw err;
        res.forEach(({title}) => console.log(title));
        quit();
    });
};

const viewEmployees = () => {
    const query = 'SELECT first_name, last_name FROM employee';
    connect.query(query, (err, res) => {
        if(err) throw err;
        const empArray = [];
        res.forEach(({first_name, last_name, manager_id}) => {
            empArray.push(`Name: ${first_name} ${last_name}, Manager ID: ${manager_id}`);
            console.table(empArray);
        });
        quit();
    });
};


  // Logs end of results and exits the node app
  function quit() {
        console.log("---End of results. Thank you.---");
        process.exit(0);
      }

module.exports = viewDB