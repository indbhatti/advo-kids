# Advo-Kids (Interactive Law Education App)

A web application designed to teach children about law through interactive quizzes, supporting both English and Hindi, with dynamic quiz expansion capabilities.

## Features

- **Bilingual Support**: Quizzes available in English and Hindi for broader accessibility.
- **Interactive Learning**: Engaging quizzes to make learning about law fun and educational.
- **Dynamic Expansion**: Easily add and update quiz content.
- **Responsive Design**: Built with Tailwind CSS for a seamless user experience on all devices.
- **User Authentication**: NextAuth with Google OAuth for secure and simple sign-in.
- **Efficient Data Management**: All data is stored in MongoDB, connected through a RESTful API.

## Technologies Used

### Frontend

- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for modern and responsive design.

### Backend

- **Next.js App Router**: Structured routing and server-side functionalities.
- **Server Actions**: For seamless data handling and real-time updates.
- **NextAuth**: Handles user authentication with support for Google OAuth.

### Database

- **MongoDB**: NoSQL database to manage user and quiz data efficiently.

## Getting Started

### Prerequisites

- **Node.js**: Install Node.js from [official website](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database (local or cloud).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/indbhatti/interactive-law-app.git
   cd interactive-law-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   MONGO_URI=<your-mongodb-connection-string>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and receive access tokens.

### Quiz Data

- `GET /api/quizzes`: Fetch all quizzes.
- `POST /api/quizzes`: Add a new quiz.
- `PUT /api/quizzes/:id`: Update a quiz.
- `DELETE /api/quizzes/:id`: Delete a quiz.

## Folder Structure

```
.
├── components
├── src
│   ├── app
│   │    ├── auth
│   │    ├── api
│   │    └── quiz ...
│   ├── components
│   ├── models
│   ├── serverActions
│   └── util
├── public
├── styles
├── utils
├── .env
├── package.json
└── README.md
```

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or suggestions, contact [Inderpreet](mailto:inderprbhatti@gmail.com).
