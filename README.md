# Jimmazon application using Node.js & MySQL #
**Overview**

The app will take in orders from customers and deplete stock from the store's inventory. It will also track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
- - - -
**jmzUser.js = Customer View**
1. Display all of the items available for sale including the ids, names, and prices.
2. Inquire item_id a customer would like to buy.
3. Inquire how many units of the product a customer would like to buy.
4. Once the customer has placed the order, application  checks if store has enough of the product to meet the customer's request.
    * If store does have enough of the product, fulfill the customer's order.
    * If not, alert insufficient quantity then prevent the order from going through.

![picture alt](./preview1.png?raw=true "Preview 1")
- - - -
**jmzAdmin.js = Manager View**
1. List a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
2. View Products for Sale
    * Displays every available item: the item IDs, names, prices, and quantities.
3. View Low Inventory
    * Displays all items with a inventory count lower than five.
4. Add to Inventory
    * Displays a prompt that will let the manager "add more" of any item currently in the store.
5. Add New Product
    * Allows the manager to add a completely new product to the store.

![picture alt](./preview2.png?raw=true "Preview 2")
- - - -
**jmzMaster.js = Supervisor View**
1. Calculates the total sales from each transaction.
2. View Product Sales by Department
    * Displays a summarized table in their terminal/bash window.

![picture alt](./preview3.png?raw=true "Preview 3")
- - - -

**Watch YouTube Video Demo**
[Demo Link](https://youtu.be/uIVUbBSKfUM)