CREATE TABLE users(
	id SERIAL,
	email VARCHAR(50),
	name VARCHAR(50),
	lastname VARCHAR(50),
	age INTEGER,
	phone VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE products(
	id SERIAL,
	name VARCHAR(50),
	image VARCHAR(50),
	description VARCHAR(255),
	price REAL,
	category VARCHAR(50),
	id_seller INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (id_seller) REFERENCES users(id)
);