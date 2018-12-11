var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        start();
    });
};

function correctInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function start() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What would you like to buy (Please indicate with the item_id)?",
                validate: correctInput,
                filter: Number
            },
            {
                name: "amount",
                type: "input",
                message: "How much would you like to purchase?",
                validate: correctInput,
                filter: Number
            }
        ])
        .then(function (answer) {
            var product = answer.product;
            var amount = answer.amount;

            var productsTable = 'SELECT * FROM products WHERE ?';

            connection.query(productsTable, { item_id: product }, function (err, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please input a valid Item ID.');
                    displayProducts();

                } else {
                    var productData = data[0];

                    if (amount <= productData.stock_quantity) {
                        console.log("This product is in stock. Order is being placed...");

                        var updateproductsTable = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - amount) + ' WHERE item_id = ' + product;

                        connection.query(updateproductsTable, function (err, data) {
                            if (err) throw err;

                            console.log("The order has been placed! The total is $" + productData.price * amount);
                            console.log("----------------------------------------------------------------------------------------");
                            console.log("");
                        });

                        displayProducts();
                    } else {
                        console.log("");
                        console.log("------------------------------------------------------------------------------");

                        console.log("There is not enough in stock. Please update your order or choose another item.");

                        displayProducts();
                    };
                };
            });
        });
};

displayProducts();