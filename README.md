# Dragon Ball API

**Love Dragon Ball?** This API is made for all Dragon Ball fans! Access, update, and manage your favorite Dragon Ball data with our custom-built API.

<p align="center">
  <a href="https://shardendu-mishra-documentation-dragon-ball-api.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/View%20Docs%20Here-Click%20Me-brightgreen?style=for-the-badge" alt="API Documentation">
  </a>
  <a href="https://dragon-ball-api-grlr.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/API-Link-blue?style=for-the-badge" alt="API Link">
  </a>
</p>

---

## Features

- **Custom API:** Built with Express.js and TypeScript
- **CRUD Operations:** Support for `POST`, `PUT`, `PATCH`, `GET`, and `DELETE` requests
- **Authentication:** JWT for secure routes
- **Database:** MongoDB with Mongoose
- **Documentation:** [Nextra-based documentation](https://shardendu-mishra-documentation-dragon-ball-api.vercel.app)

---

## API Endpoints

| Method | Endpoint               | Description                            | Authentication |
|--------|------------------------|----------------------------------------|----------------|
| GET    | `/`                    | Welcome page with docs link            | No             |
| GET    | `/random`              | Get a random question                  | No             |
| GET    | `/question/:id`        | Get a question by ID                   | No             |
| GET    | `/series/:series`      | Get questions by series                | No             |
| POST   | `/add`                 | Add a new question                     | No             |
| PUT    | `/question/:id`        | Full update of a question by ID        | No             |
| PATCH  | `/question/:id`        | Partial update of a question by ID     | No             |
| DELETE | `/question/:id`        | Delete a question by ID                | Yes (Admin)    |
| DELETE | `/delete`              | Delete all questions (reset database)  | Yes (Admin)    |
| POST   | `/GetTokenAdmin`       | Get a token for admin actions          | No             |

For more detailed documentation, visit the [API Docs](https://shardendu-mishra-documentation-dragon-ball-api.vercel.app).

---

## Tech Stack

- ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
  **Express.js:** A fast and minimalist web framework for Node.js used for building APIs.
  
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
  **TypeScript:** A strongly-typed superset of JavaScript that enhances code quality and scalability.

- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)  
  **JWT (JSON Web Tokens):** Secure token-based authentication mechanism for protecting routes.

- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  
  **MongoDB:** A NoSQL database used for flexible and scalable data storage.

- ![Nextra](https://img.shields.io/badge/Nextra-007ACC?style=for-the-badge&logo=vercel&logoColor=white)  
  **Nextra:** A static site generator used for creating the project’s documentation.

---

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shardendu-mishra/dragon-ball-api.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the API:
   ```bash
   npm run start
   ```

### Testing the API
You can test the API with tools like [Postman](https://www.postman.com/) or directly using `curl`:
```bash
curl -X GET https://dragon-ball-api-grlr.onrender.com/random
```

---

## Contributing

Feel free to open issues or contribute to this project by submitting pull requests.

---
