# Clay Showroom Backend

This is the backend for the Clay Showroom application.

## How to run
```
npm install
```

```
npm run dev
```

## How to test the API (this is not for our app products, it's just for reference)
1. Install Thunder Client VScode extension
2. Click "New Request"

### Get Articles
1. Change dropdown box value to "GET"
2. Enter this request URL:http://localhost:3001/api/articles then press Send button 

### Get Article by id
1. Change dropdown box value to "GET"
2. Enter this request URL:http://localhost:3001/api/articles/62f72c38cc751b4cecb0ac91 then press Send button

### Create a new article
1. Change dropdown box value to "POST"
2. Enter this request URL:http://localhost:3001/api/articles
3. Click on the "Body" tab
4. Click on the "Form-encode" tab
5. Enter this data:
title: My article 
description: This is my first article
body: Bla bla bla

### Delete an article
1. Change dropdown box value to "DELETE"
2. Enter this request URL:http://localhost:3001/api/articles/article-id-goes-here then press Send button

### Update an article
1. Change dropdown box value to "PUT"
2. Enter this request URL:http://localhost:3001/api/articles/article-id-goes-here
3. Click on the "Body" tab
4. Click on the "Form-encode" tab
5. Enter this data:
title: My article! 
description: This is my first article!
body: Bla bla bla!