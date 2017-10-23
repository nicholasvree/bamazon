#Bamazon CLI Applications

##Bamazon Customer
Bamazon Customer (accessible via *node bamazon_customer.js*) is an application for customers and performs the following:

* Upon opening, the application will load a list of all products at Bamazon.
* The application will then ask the customer the ID and Quantity of product the user would like to purchase.
* This purchase information (the stock quanity and total product sales) is updated.

##Bamazon Manager
Bamazon Manager (accessible via *node bamazon_manager.js*) is an application for managers and performs the following:

* Upon loading, the application presents the manager with 4 options:
	* View products for sale
		* All products sold by Bamazon are displayed.
	* View products with low inventory
		* All products with an inventory less than 5 are displayed.
	* Add inventory for a particular product
		* Search for a particular product by name, then select the intended product and increase the quantity by a desired amount.
	* Add new products
		* Create an entirely new product for Bamazon to sell.

##Bamazon Supervisor
Bamazon Supervisor (accessible via *node bamazon_supervisor.js*) is an application for supervisors and performs the following:

* Upon loading, the applications presents the supervisor with 2 options:
	* View all departments including overhead costs, total sales and total profit.
	* Add a new department

##Techical Information
This application was made using node.js including the inquirer, mysql, and console.table modules.  See the package.json for module information.

The Bamazon database schema can be found in bamazon_schema.sql 