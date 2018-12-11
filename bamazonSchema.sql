DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("guitar", "music", 500, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "outdoor/sports", 200, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avengers: Age of Ultron", "entertainment", 29.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronic", 350, 3);