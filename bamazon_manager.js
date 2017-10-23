
var mysql = require('mysql')
var inquirer = require('inquirer')

connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gold0water",
  database: "bamazon"
});

connection.connect(function(err) {

askQuestion()

})


function askQuestion(){
	inquirer
	.prompt({
		type : "list",
		name: "chooseOption",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		message: "What would you like to do?"
	}).then(function(answer){
		if(answer.chooseOption === "View Products for Sale"){
			viewProducts()
		} 
		else if(answer.chooseOption === "View Low Inventory"){
			viewInventory()
		}
		else if(answer.chooseOption === "Add to Inventory"){
			addInventory()
		}
		else if(answer.chooseOption === "Add New Product"){
			addProduct()
		}
	})
}


	



function viewProducts(){
	connection.query("SELECT * FROM product", function(err,results){
		if (err) throw err;
		console.log("---------------------------------------------");
		console.log("VIEW PRODUCTS")

		for (var i = 0; i < results.length; i++) {
            console.log("id: " + results[i].item_id +" name: " +results[i].product_name+ " price: " + results[i].price);
        }
        console.log("---------------------------------------------");
        askQuestion()
	})
}

function viewInventory(){
	connection.query("SELECT * FROM product WHERE stock_quantity <= 5", function(err, results){
		if (err) throw err;
		console.log("---------------------------------------------");
		console.log("LOW INVENTORY")

		for (var i = 0; i < results.length; i++) {
            console.log("id: " + results[i].item_id +" name: " +results[i].product_name+ " in-stock: " + results[i].stock_quantity);
        }
        console.log("---------------------------------------------");
      	askQuestion()
	})

}

function addInventory(){
	inquirer
	.prompt(
			{
				name: "search",
				type: "input",
				message: "Search for a product"
			}
		)
	.then(function(answer){
		connection.query("SELECT item_id, product_name, stock_quantity FROM product WHERE product_name LIKE ? ", '%' +[answer.search] + '%', function(err,results){
			if (err) throw err;
			//I ran out of time to print this to the screen nicely so I am just printing the array of row packets
			console.log(results)
			inquirer
			.prompt(
				[
					{
						name: "itemID",
						type: "input",
						message: "Enter the ID you would like to update inventory for:"
					},
					{
						name: "addAmount",
						type: "input",
						message: "How many items to add?"
					}
				]
			).then(function(answer){
				connection.query("SELECT stock_quantity FROM product WHERE ?", {item_id : answer.itemID}, function(err, results){
					if (err) throw err;
					var newSetAmount = parseInt(results[0].stock_quantity) + parseInt(answer.addAmount)
					connection.query("UPDATE product SET ? WHERE ?",
						[
							{
								stock_quantity : newSetAmount
							}, 
							{
								item_id : answer.itemID
							}
						], function(err, results){
						if (err) throw err;
						console.log("---------------------------------------------");
						console.log("Item has been updated");
						console.log("---------------------------------------------");
						askQuestion()
					})
				})
			})
		})
	})
}


function addProduct(){
	inquirer
	.prompt(
		[
			{
				name: "product",
				type: "input",
				message: "what product to add?"
			},
			{
				name: "department",
				type: "input",
				message: "What department does this product belong?"
			},
			{
				name: "price",
				type: "input",
				message: "What price?"
			},
			{
				name: "stock",
				type: "input",
				message: "How many stock?"
			}
		]
	).then(function(answer){
		connection.query( "INSERT INTO product SET ?",
		    {product_name: answer.product, department_name: answer.department,price: answer.price,stock_quantity: answer.stock},function(err, res) {
     			
     			console.log("---------------------------------------------");
     			console.log(res.affectedRows + " product inserted!\n")
     			console.log("---------------------------------------------");
     			
     			askQuestion()
	    	}
		)	

	})
}








