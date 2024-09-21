Here's the README.md file for your Dragon Ball API project:

# Dragon Ball API

**Love Dragon Ball?** This API is made for all Dragon Ball fans! Access, update, and manage your favorite Dragon Ball data with our custom-built API.

[![API Documentation](https://img.shields.io/badge/Docs-Available-brightgreen)](https://shardendu-mishra-documentation-dragon-ball-api.vercel.app)  
[![API Link](https://img.shields.io/badge/API-Link-blue)](https://dragon-ball-api-grlr.onrender.com)

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
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Nextra](https://img.shields.io/badge/Nextra-007ACC?style=for-the-badge&logo=vercel&logoColor=white)

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

## License

This project is licensed under the MIT License.
