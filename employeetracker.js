const mysql = require('mysql');
const connect = require('./config/connection')
const inquirer = require('inquirer');
const addToDB = require('./lib/addition');
//REQUIRE YOUR NEW FILES


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

accessDB();






