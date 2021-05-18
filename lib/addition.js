const inquirer = require('inquirer');
const connect = require('../config/connection')

const addToDB = () => {
    inquirer
    .prompt({
        name: 'addType',
        type: 'rawlist',
        message: 'What would you like to add?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    })
    .then((answer) => {
        switch(answer.addType) {
            case 'Departments':
                addDepts();
                break;

            case 'Roles':
                addRoles();
                break; 

            case 'Employees':
                addEmployees();
                break; 
            
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }

    })

};

const addDepts = () => {
    inquirer
    .prompt({
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new Department?'
        
    })
    .then((answer) => {
        connect.query('INSERT INTO department SET ?', {name: answer.deptName}, (err,res) => {
            if (err) throw err;
            console.log('New department was created successfully!');
        })
    })
};


const addRoles = () => {
    inquirer
    .prompt(
        [
        {name: 'title',
        type: 'input',
        message: 'What is the role title?'},

        {name: 'salary',
        type: 'input',
        message: 'What is the salary for the role?'},

       {name: 'dept',
        type: 'rawlist',
        message: 'Which department is this role assigned to?',
        choices: [
            'Information Technology',
            'Procurement',
            'Legal'
        ]
        
    }])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        switch(answer.dept) {
            case 'Information Technology':
                deptId = 1;
                break;

            case 'Procurement':
                deptId = 2;
                break; 

            case 'Legal':
                deptId = 3;
                break; 
            
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        };
        connect.query(
          'INSERT INTO role SET ?',
          {
            title: answer.title,
            salary: answer.salary,
            department_id: deptId
          },
          (err) => {
            if (err) throw err;
            console.log('New role was created successfully!');
            quit();
          }
        );
      });
}


const addEmployees = () => {
    inquirer
    .prompt(
        [
        {name: 'first',
        type: 'input',
        message: 'What is the employee’s first name?'},

        {name: 'last',
        type: 'input',
        message: 'What is the employee’s last name?'},

       {name: 'role',
        type: 'input',
        message: 'What is this employee’s Role ID?',        
        },
        {name: 'manager',
        type: 'input',
        message: 'What is this employee’s Manager ID?',        
        }
    ])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info        
        connect.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.role,
            manager_id: answer.manager
          },
          (err) => {
            if (err) throw err;
            console.log('New employee was created successfully!');
            quit();
          }
        );
      });
}


  // Logs end of results and exits the node app
  function quit() {
    console.log("---End of process. Thank you.---");
    process.exit(0);
  }

module.exports = addToDB