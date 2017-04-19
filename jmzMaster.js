// declare constants for npm tools
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "ejrvy1024",
    database: "jimmazonDB"
});
connection.connect(function (err) {
    if (err) { throw err; }
    console.log("connected as id " + connection.threadId);
    inquireInput();
});

// inquire user for item and quantity input
function inquireInput() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an Option Below:",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "View Product Sales by Department":
                viewProductSales();
                break;
            case "Create New Department":
                createDepartment()
                break;
            case "Quit":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

// allow master to view product sales by department
function viewProductSales(){
    var query = "SELECT *, total_sales - over_head_costs AS total_profit FROM departments"
    connection.query(query, function(err, res){
        console.table(res);
    });
    inquireInput();
}

// allow master to create new department
function createDepartment() {
    console.log('Create New Department');
    connection.query("SELECT * FROM `departments`",
        function (err, res) {
            var departments = res;
            console.table(departments);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter Department Name: ",
                    name: "department_name"
                },
                {
                    type: "input",
                    message: "Enter Overhead Cost: ",
                    name: "overhead_cost"
                },
            ]).then(function (user) {
                connection.query("INSERT INTO departments SET ?", {
                    department_name: user.department_name,
                    over_head_costs: user.overhead_cost,
                    quantity_sold: 0,
                    total_sales: 0,
                }, function (err, res) { });
                console.log("New department has been created");
                inquireInput();
            });
        });

}