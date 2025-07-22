# Roadmap Blogging Platform API

A simple and professional RESTful API for a personal blogging platform built using **Node.js**, **Express.js**, and **MongoDB**.

## 📚 Features

- Create, Read, Update, Delete (CRUD) blog posts
- Filter blog posts by a search term (`title`, `content`, `category`, `tags`)
- Input validation using `express-validator`
- Optimized MongoDB queries with performance timing via `console.time`
- Proper error handling & debug logs

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local instance)
- **Validation**: express-validator
- **Logging**: console.time, morgan

---

## 🚀 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/farrukh-ali-khan/roadmap-blogging-platform-API.git
cd roadmap-blogging-platform-API

# Install dependencies
npm install

# Start MongoDB (local)
# Make sure MongoDB is running locally on mongodb://localhost:27017/blogDB

# Start server
npm run dev
```

---

## 🔌 API Endpoints

### Create Blog Post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
        "title": "My First Blog Post",
        "content": "This is the content of my first blog post.",
        "category": "Technology",
        "tags": ["Tech", "Programming"]
      }'
```

✅ **Response: 201 Created** with the new post JSON

---

### Get All Blog Posts (with optional search)

```bash
curl -X GET "http://localhost:3000/posts?term=tech"
```

✅ **Response: 200 OK** with array of matching posts

---

### Get Single Blog Post

```bash
curl -X GET http://localhost:3000/posts/<id>
```

✅ **Response: 200 OK** or **404 Not Found**

---

### Update Blog Post

```bash
curl -X PUT http://localhost:3000/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Updated Blog Post",
        "content": "Updated content here.",
        "category": "Technology",
        "tags": ["Updated", "Tech"]
      }'
```

✅ **Response: 200 OK** with updated post or **404 Not Found**

---

### Delete Blog Post

```bash
curl -X DELETE http://localhost:3000/posts/<id>
```

✅ **Response: 204 No Content** or **404 Not Found**

---

## 📂 Project Structure

```
.
├── app.js             # Entry point
├── config/db.js       # MongoDB connection
├── controllers/postController.js
├── models/Post.js     # Mongoose schema
├── routes/postRoutes.js
├── middlewares/errorHandler.js
├── utils/logger.js    # For timing & logging
├── .env               # MongoDB URI & config
├── package.json
```

---

## ✅ Requirements Checklist

-

> ✅ All requirements have been met.

---

## 🐞 Error Handling & Logging

- All async routes are wrapped using a central `asyncHandler`
- Input validation errors return `400 Bad Request`
- Missing records return `404 Not Found`
- Unexpected errors are caught globally via a centralized error handler
- Query execution time is logged for each request (e.g., `getAllPosts: 2.47ms`)

---

## 📄 License

MIT

---

## 👨‍💻 Author

**Farrukh Ali Khan**

GitHub: [@farrukh-ali-khan](https://github.com/farrukh-ali-khan)
