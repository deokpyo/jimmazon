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
            var new_sales = total_cost + products[i].product_sales;
            updateProducts(user.item_id, new_quantity, new_sales, total_cost);
            var query = "SELECT departments.over_head_costs, departments.quantity_sold, departments.total_sales  FROM `products` INNER JOIN `departments` ON products.department_name = departments.department_name WHERE products.item_id = ?"
            connection.query(query, user.item_id,
                function (err, res) {
                    var overhead = res[0].over_head_costs;
                    var new_sold = res[0].quantity_sold + parseInt(user.item_quantity);
                    var total_sales = res[0].total_sales + new_sales;
                    updateDepartments(user.item_id, new_sold, total_sales);
                });
            displayItems();
        }
    });
}

function updateProducts(id, quantity, sales, total) {
    var query = "UPDATE products SET ? WHERE item_id = ?"
    connection.query(query,
        [
            {
                stock_quantity: quantity,
                product_sales: sales
            },
            id,
        ], function (err, res) { });
    console.log("Your total cost is: $" + parseFloat(total).toFixed(2));
}

function updateDepartments(id, sold, sales) {
    var query = "UPDATE `departments` INNER JOIN `products` ON products.department_name = departments.department_name SET departments.quantity_sold = ?, departments.total_sales = ?  WHERE products.item_id = ?"
    connection.query(query, [sold, sales, id],
        function (err, res) { });
    //connection.end();
}