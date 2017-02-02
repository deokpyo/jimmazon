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
    password: "",
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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory()
                break;
            case "Add to Inventory":
                addInventory()
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Quit":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}



// lists every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    console.log('View Products for Sale');
    connection.query("SELECT * FROM `products`",
        function (err, res) {
            console.table(res);
        });
    inquireInput();
}

// lists all items with a inventory count lower than five.
function viewInventory() {
    console.log('View Low Inventory');
    connection.query("SELECT * FROM `products` WHERE `stock_quantity` < ?", [5],
        function (err, res) {
            console.table(res);
        });
    inquireInput();
}

// display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    console.log('Add to Inventory');
    connection.query("SELECT * FROM `products`",
        function (err, res) {
            var products = res;
            console.table(products);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter item_id that you would like add more: ",
                    name: "item_id"
                },
                {
                    type: "input",
                    message: "Enter quantity of the item you would like to add: ",
                    name: "item_quantity"
                }
            ]).then(function (user) {
                // index reference to access correct item from the object
                var i = user.item_id - 1;
                // update quantity in the database and display total cost based on user input
                var new_quantity = parseInt(products[i].stock_quantity) + parseInt(user.item_quantity);
                connection.query("UPDATE `products` SET ? WHERE ?",
                    [
                        { stock_quantity: new_quantity },
                        { item_id: user.item_id }
                    ], function (err, res) { });
                console.log("New quantity is now: " + new_quantity);
                inquireInput();
            });
        });
}

// allow the manager to add a completely new product to the store.
function addProduct() {
    console.log('Add New Product');
    connection.query("SELECT * FROM `products`",
        function (err, res) {
            var products = res;
            console.table(products);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter Product Name: ",
                    name: "product_name"
                },
                {
                    type: "input",
                    message: "Enter Department Name: ",
                    name: "department_name"
                },
                {
                    type: "input",
                    message: "Enter Price: ",
                    name: "price"
                },
                {
                    type: "input",
                    message: "Enter Product Quantity: ",
                    name: "stock_quantity"
                }
            ]).then(function (user) {
                connection.query("INSERT INTO products SET ?", {
                    product_name: user.product_name,
                    department_name: user.department_name,
                    price: user.price,
                    stock_quantity: user.stock_quantity,
                    product_sales: 0,
                }, function (err, res) { });
                console.log("New product has been added");
                inquireInput();
            });
        });

}
