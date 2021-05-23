const inquirer = require('inquirer');
const connect = require('../config/connection');

const updateDB = () => {
    connect.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;    
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices () {
            const empArray = [];
            results.forEach(({ id, first_name, last_name, role_id}) => {
                 empArray.push(`id: ${id}, name: ${first_name} ${last_name}, current role: ${role_id}`);
                 });
            return empArray;
          },
          message: 'Which employee would you like to update?',
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'Which role ID would you like to assign?'
        }
    ])
    .then((answer) => {
        let empId = answer.choice[4];
        console.log(empId);
        connect.query(
            'UPDATE employee SET ? WHERE ?',
            [
              {
                role_id: answer.roleId,
              },
              {
                id: empId,
              },
            ],
            (error) => {
              if (error) throw err;
              console.log('Employee updated successfully!');
              quit();
            }
          );    
    });
});
};


function quit() {
    console.log("---End of results. Thank you.---");
    process.exit(0);
  }
   
module.exports = updateDB
