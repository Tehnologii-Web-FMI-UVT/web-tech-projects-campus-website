CREATE TABLE accounts(
	id INT NOT NULL PRIMARY KEY IDENTITY,
	firstname VARCHAR (100) NOT NULL,
	lastname VARCHAR (100) NOT NULL,
	email VARCHAR (100) NOT NULL UNIQUE,
	--storing sha256 hash as VARBINARY
	userPassword VARBINARY (64) NOT NULL,
	userConfirmPassword VARBINARY (64) NOT NULL
);

DECLARE @rawPassword NVARCHAR(20) = 'admin';
DECLARE @hashedPassword VARBINARY(64) = HASHBYTES('SHA2_256',@rawPassword);

DECLARE @rawPassword_ NVARCHAR(20) = 'admin2';
DECLARE @hashedPassword_ VARBINARY(64) = HASHBYTES('SHA2_256',@rawPassword_);

INSERT INTO accounts (firstname,lastname,email,userPassword,userConfirmPassword)
VALUES
('admin_firstname','admin_lastname','admin@email.com',@hashedPassword,@hashedPassword),
('admin_firstname2','admin_lastname2','admin2@email.com',@hashedPassword_,@hashedPassword_)