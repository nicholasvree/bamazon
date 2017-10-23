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

		var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id +" / " +results[i].product_name+ " / " + results[i].price);
            }
        console.log(choiceArray);

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
				console.log(setAmount)
				connection.query("UPDATE product SET ? WHERE ?",
				[
					{
						stock_quantity: setAmount
					},
					{
						item_id : chosenItem.item_id
					}
				], function(error){
					if (error) throw err;
              		
				})
				var totalCost = parseInt(answer.quantChoice)*chosenItem.price
				console.log("Thank you! You have been charged $" + totalCost)
			}
			else{
				console.log("Sorry there are not items left to complete that purchase")
			}
		})
	})
}

// function askSale() {
// 	inquirer
// 	.prompt({
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].product_name);
//             }
//             return choiceArray;
//           }
//           ,
//           message: "What auction would you like to place a bid in?"
//           })
// 		.then(function(answer){
// 		console.log(answer)
// 		}
// 	)
// }