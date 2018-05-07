DROP DATABASE IF EXISTS bamazon_DB;

CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL, 
price DECIMAL,
stock_quantity INT default 0,
PRIMARY KEY (id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "Electronics", 600.00, 10),
("Beats by Dre", "Electronics", 299.99, 8),
("Espresso Machine", "Kitchen", 55.00, 15),
("NES mini Classic Edition", "Games", 100.00, 1),
("'Wu-Tang Clan 36 Chambers' Vinyl Record", "Music", 35.00, 5),
("Burton Snowboard", "Outdoors", 550.00, 12),
("Osprey Backpack", "Camping", 90.00, 40),
("Diamond Earrings", "Jewelry", 2000.00, 20),
("iPhone X Case", "Electronics", 30.33, 100),
("Salt Lamp", "Home", 39.99, 72),
("WeatherTech Car Mats", "Automobile", 150.00, 93);