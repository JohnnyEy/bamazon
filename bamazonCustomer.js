var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "",
	database: "bamazon_DB"
});
//Execute connection that displays all items for sale
connection.connect(function(err){
    if (err) throw err;
    displayAll();
});

//Function to display all items for sale
function displayAll() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res){
        if (err) throw err;
        console.log("");
        console.log('                       WELCOME TO BAMAZON           ');
        var table = new Table({
            head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
            colWidths: [10, 30, 30, 10, 10],
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity,]);
        }
        console.log(table.toString());
        productId();
    }); //end connection to products
};

//Function to prompt user to enter id of product to buy
function productId() {
    inquirer.prompt([
        {
            name: 'productId',
            type: "input",
            message: "Please enter the Id of the product you wish to purchase!"
        }
    ]).then(function(answer){
        var selection = answer.productId;
        connection.query("SELECT * FROM Products WHERE id=?", selection, function(err, res){
            if (err) throw err;

            //If results equal to 0 then prompt user to pick again and run productId function again
            if (res.length === 0){
                console.log('That product does not exist, please enter an Id number from the list above');
                productId();
            }
            //Else if id does exist, ask user how many items they would like to buy
            else{
                inquirer.prompt([
                    {
                        name: 'productQuantity',
                        type: "input",
                        message: "How many items would you like to purchase?!"
                    }
                ]).then(function(answer){
                    var quantity = answer.productQuantity;
                    //If quantity is less than stock quantity display error message
                    if (quantity > res[0].stock_quantity) {
                        console.log("Cannot proceed, insufficient quantity! " + res[0].stock_quantity + " items of the product selected");
                        productId();
                    }
                    //Else display the name and price of product chosen
                    else {
                        console.log("");
                        console.log(res[0].product_name + ' purchased.');
                        console.log(quantity + ' qty @ $' + res[0].price);

                        //Sale total for product user chose
                        var saleTotal = quantity * res[0].price;
                        console.log("Sale Total: $"  + saleTotal);
                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = "+ newQuantity + " WHERE id = " + res[0].id , function (err, resUpdate){
                            if (err) throw err;
                            console.log("");
                            console.log("Your Order has been Processed");
                            console.log("Thank you for Shopping with us!");
                        });
                        //Ends connection
                        connection.end();
                    }
                });
            };
        });
    });
};