---
layout: post
title:  "catatan singkat mysql"
tanggal : "2019-06-04"
author: "malikkurosaki"
categories: "trick"
image: "https://i.postimg.cc/7Z2gfVKf/1200px-My-SQL-svg.png"
permalink: /:title
---
catatan pribadi selama memperdalam mysql , penting dan gk penting sih , cuman kalo lupa bisa diliat lagi gitu aja intinya sih<!-- more -->

### install mysql di ubuntu

``` java
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation

```

### pengamanan setelah instann

```java

sudo mysql_secure_installation

```

### liat usernya

```sql

SELECT user,authentication_string,plugin,host FROM mysql.user;

```

__keluarnya kaya gini__

```md
Output


+------------------+-------------------------------------------+-----------------------+-----------+
| user             | authentication_string                     | plugin                | host      |
+------------------+-------------------------------------------+-----------------------+-----------+
| root             |                                           | auth_socket           | localhost |
| mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| debian-sys-maint | *CC744277A401A7D25BE1CA89AFF17BF607F876FF | mysql_native_password | localhost |
+------------------+-------------------------------------------+-----------------------+-----------+


4 rows in set (0.00 sec)

```

__mengedit user__

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

```

```sql
FLUSH PRIVILEGES;
```


masuk mysl dengan password

```sql

mysql -u root -p

```

masuk tanpa password

```sql
mysql -u root 

```

buat user baru

```sql

CREATE USER 'sammy'@'localhost' IDENTIFIED BY 'password';

```

pemberian ijin user

```sql

GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;

```

lihat database

```sql

SHOW DATABASES;

```

select database / pilih database

```sql

USE <nama database>;

```

perlihatkan tabel

```sql

SHOW TABLES;

```

lihat kerangka tabel

```sql

DESCRIBE <nama tabel>;

```

lihat isi tabel

```sql

SELECT FROM * <nama tabel>;

```

lihat status server

```java

systemctl status mysql.service

```
buat databse

```sql 
CREATE DATABASE dbname;

```

buat tabel

```sql
CREATE TABLE example ( id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_example primary key (id) );
INSERT INTO example ( id, name ) VALUES ( null, 'Sample data' );

```

daftara query

```sql

SELECT - extracts data from a database
UPDATE - updates data in a database
DELETE - deletes data from a database
INSERT INTO - inserts new data into a database
CREATE DATABASE - creates a new database
ALTER DATABASE - modifies a database
CREATE TABLE - creates a new table
ALTER TABLE - modifies a table
DROP TABLE - deletes a table
CREATE INDEX - creates an index (search key)
DROP INDEX - deletes an index

```

## contoh query

### select

```sql

SELECT CustomerName,City FROM Customers;

SELECT * FROM Customers;

SELECT Country FROM Customers;

--berbeda;
SELECT DISTINCT Country FROM Customers;

SELECT COUNT(DISTINCT Country) FROM Customers;

SELECT Count(*) AS DistinctCountries
FROM (SELECT DISTINCT Country FROM Customers);

--kondisi;

SELECT * FROM Customers
WHERE Country='Mexico';

SELECT * FROM Customers
WHERE CustomerID=1;


--pilihan;

SELECT * FROM Customers
WHERE Country='Germany' AND City='Berlin';

SELECT * FROM Customers
WHERE City='Berlin' OR City='München';

SELECT * FROM Customers
WHERE Country='Germany' OR Country='Spain';

SELECT * FROM Customers
WHERE NOT Country='Germany';

SELECT * FROM Customers
WHERE Country='Germany' AND (City='Berlin' OR City='München');

SELECT * FROM Customers
WHERE NOT Country='Germany' AND NOT Country='USA';


--order naik dan turun;

SELECT * FROM Customers
ORDER BY Country;

SELECT * FROM Customers
ORDER BY Country DESC;

SELECT * FROM Customers
ORDER BY Country, CustomerName;

SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;

```


### insert

```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');


```

### is null or not

```sql

SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;

SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NOT NULL;

```

### updata

```sql

UPDATE Customers
SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;

UPDATE Customers
SET ContactName='Juan'
WHERE Country='Mexico';

UPDATE Customers
SET ContactName='Juan';

```


### hapus

```sql

DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';

-- hapus semua ;

DELETE FROM table_name;



```


### select top

```sql

SELECT TOP 3 * FROM Customers;

SELECT * FROM Customers
LIMIT 3;


SELECT * FROM Customers
WHERE ROWNUM <= 3;

SELECT TOP 50 PERCENT * FROM Customers;

SELECT TOP 3 * FROM Customers
WHERE Country='Germany';

SELECT * FROM Customers
WHERE Country='Germany'
LIMIT 3;

SELECT * FROM Customers
WHERE Country='Germany' AND ROWNUM <= 3;

```


### min max

```sql
SELECT MIN(Price) AS SmallestPrice
FROM Products;

SELECT MAX(Price) AS LargestPrice
FROM Products;

```

### arimatik

```sql
SELECT COUNT(ProductID)
FROM Products;

SELECT AVG(Price)
FROM Products;

SELECT SUM(Quantity)
FROM OrderDetails;

```


### seperti

```sql

-- awalan a;
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';

-- akhiran a;
SELECT * FROM Customers
WHERE CustomerName LIKE '%a';

-- ada or nya;

SELECT * FROM Customers
WHERE CustomerName LIKE '%or%';

-- huruf kedua adalah r;

SELECT * FROM Customers
WHERE CustomerName LIKE '_r%';

--jika a lebih dari tiga;
SELECT * FROM Customers
WHERE CustomerName LIKE 'a_%_%';

--awalan a akhiran o;
SELECT * FROM Customers
WHERE ContactName LIKE 'a%o';

--selain diawali a;
SELECT * FROM Customers
WHERE CustomerName NOT LIKE 'a%';

```

### wild card 

`cari sendiri di google`


### in atau di dalam

```sql

SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');

SELECT * FROM Customers
WHERE Country IN (SELECT Country FROM Suppliers);

```

### diantara

```sql
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;

SELECT * FROM Products
WHERE Price NOT BETWEEN 10 AND 20;

SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20
AND NOT CategoryID IN (1,2,3);

SELECT * FROM Products
WHERE ProductName BETWEEN 'Carnarvon Tigers' AND 'Mozzarella di Giovanni'
ORDER BY ProductName;

SELECT * FROM Products
WHERE ProductName BETWEEN "Carnarvon Tigers" AND "Chef Anton's Cajun Seasoning"
ORDER BY ProductName;


SELECT * FROM Products
WHERE ProductName NOT BETWEEN 'Carnarvon Tigers' AND 'Mozzarella di Giovanni'
ORDER BY ProductName;


SELECT * FROM Orders
WHERE OrderDate BETWEEN #01/07/1996# AND #31/07/1996#;


SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';

```


### alias

```sql
SELECT CustomerID AS ID, CustomerName AS Customer
FROM Customers;


SELECT CustomerName AS Customer, ContactName AS [Contact Person]
FROM Customers;

SELECT CustomerName, Address + ', ' + PostalCode + ' ' + City + ', ' + Country AS Address
FROM Customers;

SELECT CustomerName, CONCAT(Address,', ',PostalCode,', ',City,', ',Country) AS Address
FROM Customers;

SELECT o.OrderID, o.OrderDate, c.CustomerName
FROM Customers AS c, Orders AS o
WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;

SELECT Orders.OrderID, Orders.OrderDate, Customers.CustomerName
FROM Customers, Orders
WHERE Customers.CustomerName="Around the Horn" AND Customers.CustomerID=Orders.CustomerID;


```


### gabung

```sql

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;



```

```md
=	Equal	
>	Greater than	
<	Less than	
>=	Greater than or equal	
<=	Less than or equal	
<>	Not equal. Note: In some versions of SQL this operator may be written as !=	
BETWEEN	Between a certain range	
LIKE	Search for a pattern	
IN	To specify multiple possible values for a column

```

