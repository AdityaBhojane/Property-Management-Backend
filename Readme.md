# Nestify Backend - Property Management

Welcome to the **Nestify Backend** project! This repository contains the backend code for the **Nestify Property Management** system. Designed for scalability and reliability, the backend ensures seamless data handling, real-time communication, and secure operations.

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Features](#-features)
3. [Installation and Setup](#%EF%B8%8F-installation-and-setup)
4. [Code Highlights](#-code-highlights)
5. [Contact](#-contact)

## 🚀 Tech Stack

The backend leverages a modern and robust tech stack for efficient and secure operations:

- **Node.js**: JavaScript runtime for building fast and scalable server-side applications.
- **Express**: Minimalist web framework for Node.js.
- **TypeScript**: Ensures type safety and a better developer experience.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Redis**: In-memory data store for caching and queue handling.
- **Bull**: A Redis-based job queue for handling background tasks.
- **Socket.IO**: Real-time, bidirectional communication.
- **Argon2**: Secure password hashing algorithm.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Cloudinary**: Cloud-based media management.
- **Multer**: Middleware for handling multipart/form-data for file uploads.
- **Nodemailer**: For sending emails.
- **Zod**: Schema validation for better data integrity.

## 🌟 Features

1. **Secure Authentication**:
   - OTP-based authentication.
   - Password hashing using Argon2.
2. **Property Management**:
   - CRUD operations for property data.
   - Image uploads integrated with Cloudinary.
3. **Real-time Communication**:
   - Real-time chat using Socket.IO.
4. **Background Jobs**:
   - Email handling via Nodemailer, managed with Bull and Redis queues.
5. **Data Validation**:
   - Strong schema validation with Zod.

## 🖥️ Installation and Setup

Follow these steps to set up the backend locally:

1. **Clone the repository**:
   ```bash
   git clone <backend-repo-link>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd <backend-repo-folder>
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   REDIS_URL=<your-redis-url>
   EMAIL_USER=<your-email>
   EMAIL_PASSWORD=<your-email-password>
   ```

5. **Run the server**:
   ```bash
   npm run dev
   ```

6. **Test the APIs**:
   Use tools like Postman or cURL to interact with the endpoints. The server runs on `http://localhost:5000` by default.

## 🔍 Code Highlights

### Secure Authentication
- Passwords are hashed using Argon2 for enhanced security.
- JWT-based authentication ensures secure and stateless sessions.

### Real-time Communication
- Socket.IO powers real-time chats, enabling instant interactions between users and agents.

### Background Job Processing
- Bull, integrated with Redis, handles email queues for reliable email delivery.

### File Uploads
- Property images are uploaded to Cloudinary using Multer for efficient media management.

## 📧 Contact

If you have any questions or suggestions, feel free to contact the project maintainer:

- **Name**: Aditya Bhojane
- **GitHub**: [AdityaBhojane](https://github.com/AdityaBhojane)

---

Thank you for exploring the **Nestify Backend**! We hope it meets your expectations. Happy coding! 🎉

