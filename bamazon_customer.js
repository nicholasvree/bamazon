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

	if (err) throw err;

	displayAndSell()


})

function displayAndSell() {

	connection.query("SELECT * FROM product", function(err, results){
		console.log("ITEMS TO BUY")
		for (var i = 0; i < results.length; i++) {
            console.log("id: " + results[i].item_id +" name: " +results[i].product_name+ " price: " + results[i].price);
        }

		var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id +" / " +results[i].product_name+ " / " + results[i].price);
            }
		inquirer
		.prompt([{
        	name: "prodChoice",
        	type: "input",
          	message: "Enter the Item ID you would like to buy?"
          },
          {
          	name:"quantChoice",
          	type:"input",
          	message:"How many would you like to buy?"
          }])
		.then(function(answer){
			var chosenItem;

			for(var i = 0; i<results.length; i++){
				if(parseInt(results[i].item_id) == parseInt(answer.prodChoice)){
					chosenItem = results[i]
				}
			}

			if(parseInt(answer.quantChoice)<=chosenItem.stock_quantity){
				var setAmount = chosenItem.stock_quantity - parseInt(answer.quantChoice)
				var totalCost = parseInt(answer.quantChoice)*chosenItem.price;
				var totalSales = totalCost + chosenItem.product_sales;
				connection.query("UPDATE product SET ? WHERE ?",
				[
					{
						product_sales: totalSales,
						stock_quantity: setAmount
					},
					{
						item_id : chosenItem.item_id
					}
				], function(error){
					if (error) throw err;
              		
				})
				console.log("---------------------------------------------");
				console.log("Thank you! You have been charged $" + totalCost);
				console.log("---------------------------------------------");

				displayAndSell()
			}
			else{
				console.log("---------------------------------------------");
				console.log("Sorry there are not items left to complete that purchase")
				console.log("---------------------------------------------");
				displayAndSell()
			}
		})
	})


}


