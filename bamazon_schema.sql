-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "people" within animals_db --
CREATE TABLE product (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  price DECIMAL(10,2) NOT NULL,
  -- Makes a sting column called "pet_name" --
  stock_quantity INTEGER(10) NOT NULL,

  product_sales DECIMAL(10,2) DEFAULT 0 NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO product(product_name, department_name, price, stock_quantity)
VALUES ("basketball", "sporting goods", 25.00, 100),
("tennis balls", "sporting goods", 12.00, 200), 
("ream of paper", "office supplies", 5.00, 500),  
("stapler", "office supplies", 10.00, 150),  
("blue jeans", "clothing", 75.00, 75),
("oxford shirt", "clothing", 45.00, 125), 
("tshirt", "clothing", 20.00, 300),  
("socks", "clothing", 10.00, 200),
("Windex", "household", 7.50, 300),  
("Clorox", "houshold", 12.00, 250);
 

 CREATE TABLE department (
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,

  department_name VARCHAR(30) NOT NULL,

  over_head_costs DECIMAL (10,2) NOT NULL,

  PRIMARY KEY (department_id)

  );

INSERT INTO department(department_name, over_head_costs)
VALUES ("sporting goods", 1000),
("office supplies", 1000), 
("clothing", 1000), 
("household", 1000)
