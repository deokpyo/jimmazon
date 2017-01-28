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
    displayItems();
});

// select all the data from the table and display to user as a table
function displayItems() {
    connection.query("SELECT * FROM `products`",
        function (err, res) {
            console.table(res);
            inquireInput(res);
        });
}

// inquire user for item and quantity input
function inquireInput(products) {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter item_id that you would like to buy: ",
            name: "item_id"
        },
        {
            type: "input",
            message: "Enter quantity of the item you would like to buy: ",
            name: "item_quantity"
        }
    ]).then(function (user) {
        // index reference to access correct item from the object
        var i = user.item_id - 1;
        // check for quantity
        if (user.item_quantity > products[i].stock_quantity) {
            console.log("Current stock quantity is insufficient for your request");
            displayItems();
        } else {
            // update quantity in the database and display total cost based on user input
            var new_quantity = products[i].stock_quantity - user.item_quantity;
            var total_cost = products[i].price * user.item_quantity;
            connection.query("UPDATE `products` SET ? WHERE ?",
                [
                    { stock_quantity: new_quantity },
                    { item_id: user.item_id }
                ], function (err, res) { });
            console.log("Your total cost is: $" + total_cost);
            displayItems();
        }
    });
}