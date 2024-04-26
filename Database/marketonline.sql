CREATE TABLE users(
	id SERIAL,
	email VARCHAR(50),
	name VARCHAR(50),
	lastname VARCHAR(50),
	age INTEGER,
	phone VARCHAR(50),
	PRIMARY KEY (id));

CREATE TABLE category(
	id SERIAL,
	name VARCHAR(50),
	PRIMARY KEY (id));

CREATE TABLE products(
	id SERIAL,
	name VARCHAR(50),
	image VARCHAR(50),
	description VARCHAR(255),
	price REAL,
	id_category INTEGER,
	id_seller INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (id_category) REFERENCES category(id),
	FOREIGN KEY (id_seller) REFERENCES users(id));


INSERT INTO users (email, name, lastname, age, phone) 
			VALUES ('pro33cl@yahoo.com', 'Hector', 'Rubilar', 38, '+56993398843'),
				   ('ruben@gmail.com', 'Ruben', 'Soto', 40, '+5699313543'),
				   ('alejandro@gmail.com', 'Alejandro', 'Merino', 50, '+5699312563'),
				   ('juan@gmail.com', 'Juan', 'Molina', 33, '+5699314863'),
				   ('andres@gmail.com', 'Andres', 'Aguilera', 45, '+5644412563');



INSERT INTO category (name)
		VALUES	  	 ('pantalón'),
				     ('falda'),
				     ('camisa'),
				     ('blusa'),
				     ('zapatos'),
				     ('zapatillas');


INSERT INTO products (name, image, description, price, id_category, id_seller) 
			VALUES   ('camisa arrow', 'imagen.jpg', 'lr3kvn ltn rkfn', 15000, 3, 1),
					 ('pantalon azul', 'imagen.jpg', 'lr3kvn ltn rkfn', 20000, 1, 1),
					 ('pantalon verde', 'imagen.jpg', 'lr3kvn ltn rkfn', 18000, 1, 1),
					 ('camisa arrow', 'imagen.jpg', 'lr3kvn ltn rkfn', 15000, 3, 2),
					 ('pantalon rojo', 'imagen.jpg', 'lr3kvn ltn rkfn', 20000, 1, 2),
					 ('pantalon amarillo', 'imagen.jpg', 'lr3kvn ltn rkfn', 18000, 1, 2);
					 
SELECT * FROM users;

SELECT * FROM category;

SELECT * FROM products;

SELECT * FROM products WHERE id_seller = 1;

SELECT products.id, products.name, products.image, products.description, products.price, category.name AS category
	FROM products 
	LEFT JOIN category 
	ON products.id_category = category.id
	WHERE products.id_seller = 1;

					 
					 
					 