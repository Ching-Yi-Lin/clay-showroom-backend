# Clay Showroom Backend

This is the backend for the Clay Showroom application.

## How to run

First create a .env file with key "MONGODB_URI" and value of your MongoDB connection string
```
npm install
```

```
npm run dev
```

## How to test the API (this is not for our app products, it's just for reference)
1. Install Thunder Client VScode extension
2. Click "New Request"

### Get Products
1. Change dropdown box value to "GET"
2. Enter this request URL:http://localhost:3001/api/products then press Send button 

### Get Product by id
1. Change dropdown box value to "GET"
2. Enter this request URL:http://localhost:3001/api/products/62f72c38cc751b4cecb0ac91 then press Send button

### Create a new product
1. Change dropdown box value to "POST"
2. Enter this request URL:http://localhost:3001/api/products
3. Click on the "Body" tab
4. Click on the "Form-encode" tab
5. Enter this data:
title: My product 
description: This is my first product
body: Bla bla bla

### Delete an product
1. Change dropdown box value to "DELETE"
2. Enter this request URL:http://localhost:3001/api/products/product-id-goes-here then press Send button

### Update an product
1. Change dropdown box value to "PUT"
2. Enter this request URL:http://localhost:3001/api/products/product-id-goes-here
3. Click on the "Body" tab
4. Click on the "Form-encode" tab
5. Enter this data:
title: My product! 
description: This is my first product!
body: Bla bla bla!