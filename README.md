# Jimmazon using Node.js & MySQL #
**Overview**
The app will take in orders from customers and deplete stock from the store's inventory. It will also track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
- - - -
**jmzUser.js = Customer View**
1. Display all of the items available for sale including the ids, names, and prices.
2. Inquire product_id a customer would like to buy.
3. Inquire how many units of the product a customer would like to buy.
4. Once the customer has placed the order, application  checks if store has enough of the product to meet the customer's request.
    * If store does have enough of the product, fulfill the customer's order.
    * If not, alert insufficient quantity then prevent the order from going through.

![picture alt](./preview1.png?raw=true "Preview 1")
- - - -
**jmzAdmin.js = Manager View**
- - - -
**jmzMaster.js = Supervisor View**