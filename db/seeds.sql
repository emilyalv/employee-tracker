INSERT INTO department(name) VALUES
('Information Technology'),
('Procurement'),
('Legal');

INSERT INTO role(title, salary, department_id) VALUES
('Front-End Developer', 100000, 1),
('Back-End Developer', 102000, 1),
('Lawyer', 160000, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Emily','Alvarado', 1, null ),
('John', 'Smith', 2, 1),
('Amy', 'Lewis', 3, 1);

