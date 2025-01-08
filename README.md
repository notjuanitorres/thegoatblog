# 🐐 TheGOATBlog

TheGOATBlog is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for 📝 creating, ✏️ editing, and 📤 managing blog posts. It features 🔒 user authentication, 🎨 post creation, 📷 image uploads, and an intuitive 🖋️ WYSIWYG editor for crafting beautiful content.


## ✨ Features

- **🔐 User Authentication**
  - Secure registration and login system
  - JWT-based authentication with secure cookies
  - Protected routes for authenticated users

- **📝 Content Management**
  - Create and edit blog posts
  - Rich text editing with WYSIWYG interface
  - Cover image upload support
  - Responsive design for all devices

- **🖋️ Rich Text Editor**
  - Powered by React-Quill
  - Full formatting capabilities
  - Image embedding support

## ⚙️ Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- React-Quill
- Date-FNS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing
- Multer for file handling

## 🚀 Getting Started

### Prerequisites
- Node.js and npm/yarn
- MongoDB instance (local or remote)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/thegoatblog.git
cd thegoatblog
```

2. Install dependencies
```bash
# Install backend dependencies
yarn install

# Install frontend dependencies
cd client
yarn install
```

3. Create environment variables
Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
```

4. Start the application
```bash
# Start backend (from backend directory)
cd api
nodemon index.js

# Start frontend (from client directory)
cd client
yarn start
```

5. Access the application at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### Blog Posts
- `GET /post/:id` - Get specific post
- `POST /post` - Create post (authenticated)
- `PUT /post` - Update post (authenticated)

## 🔮 Roadmap
- [ ] Delete posts
- [ ] Comments system
- [ ] Post pagination
- [ ] Search functionality
- [ ] Enhanced user profiles
- [ ] Advanced error handling

## 📜 License

This project is licensed under the MIT License.
