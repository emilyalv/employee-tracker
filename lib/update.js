const inquirer = require('inquirer');
const connect = require('../config/connection');

const updateDB = () => {
    //get all roles
//   connect.query('SELECT * FROM role', (err, results) => {
//       if (err) throw err;
      //once you have roles, ask the user which one they are assigning to the employee
      inquirer 
        .prompt([           
            {
                name: 'first',
                type: 'input',
                message: 'What is the employee’s first name?',
            },
            {
                name: 'last',
                type: 'input',
                message: 'What is the employee’s last name?',
            }, 
            {
                name: 'role',
                // type: 'rawlist',
                // choices() {
                //     const roleArray = [];
                //     results.forEach(({ title }) => {
                //         roleArray.push(title);
                //     });
                //     return roleArray;
                // },
                type: 'input',
                message: 'Which Role ID would you like to assign to the employee?',
            },
        ])
        .then((answer) => {
            connect.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    role_id: answer.role,
                },
                {
                    first_name: answer.first,
                    last_name: answer.last,
                },               
            ],
            (error) => {
                if (error) throw error;
                console.log ('Role updated!');
            }
            )
            

        })
//   })
};

   
module.exports = updateDB
