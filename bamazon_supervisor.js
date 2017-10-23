var mysql = require('mysql')
var inquirer = require('inquirer')
require('console.table');


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
		choices: ["View Product Sales by Department", "Create New Department"],
		message: "What would you like to do?"
	}).then(function(answer){
		if(answer.chooseOption === "View Product Sales by Department"){
			viewProdByDept()
		} 
		else if(answer.chooseOption === "Create New Department"){
			addDept()
		}
	})
}

function viewProdByDept(){
	connection.query("SELECT department.department_id, department.department_name, department.over_head_costs, SUM(product.product_sales) AS 'total_product_sales', (SUM(product.product_sales)-over_head_costs) AS total_profit FROM department LEFT JOIN product ON department.department_name = product.department_name GROUP BY department.department_id ",
		function(err,results){
			if(err) throw err
			console.table(results)
			askQuestion()

		})
}

function addDept(){
	inquirer
	.prompt(
		[
			{
				name: "department",
				type: "input",
				message: "what department to add?"
			},
			{
				name: "overheadCosts",
				type: "input",
				message: "What are the overhead costs?"
			}
		]
	).then(function(answer){
		connection.query( "INSERT INTO department SET ?",
		    {department_name: answer.department, over_head_costs: answer.overheadCosts}, function(err, res) {
		    	console.log("---------------------------------------------");
     			console.log(res.affectedRows + " deaprtment inserted!")
     			console.log("---------------------------------------------");
     			askQuestion()	
	    	})
	})
}


