const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'alvySQL1!',
  database: 'employees_DB',
});

connection.connect((err) => {
    if (err) throw err;
    accessDB();
  });


const accessDB = () => {
    inquirer
    .prompt ({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add departments, roles, employees',
            'View departments, roles, employees',
            'Update employee roles'
        ]
    })

    .then((answer) => {
        switch(answer.action) {
            case 'Add departments, roles, employees':
                addToDB();
                break;

            case 'View departments, roles, employees':
                viewDB();
                break; 

            case 'Update employee roles':
                updateDB();
                break; 
            
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }

    });

};