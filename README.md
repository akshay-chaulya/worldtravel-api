# WorldTravel - Backend

The backend of WorldTravel handles user authentication, email verification, profile image uploads, and saving/deleting traveled cities on a map. It is built using Node.js, Express, MongoDB, and integrates Cloudinary for image storage.

## Features

1. **User Sign-up**: Users can sign up with email verification and a profile image.
2. **User Login**: Allows users to log in to their accounts.
3. **Password Reset**: Users can change their passwords.
4. **Save Traveled Cities & Countries**: Users can save cities and countries they've traveled to.
5. **Delete Saved Cities**: Users can delete previously saved cities.
6. **Pagination**: Paginated data for user-traveled cities.
7. **Full Authentication**: The backend handles secure user authentication and authorization.

## Technologies

- Node.js
- Express
- MongoDB (Mongoose)
- Cloudinary (for image storage)
- JSON Web Tokens (JWT) for authentication
- Mailtrap for email verification
- Multer (for file uploads)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/akshay-chaulya/worldtravel.git
    cd worldtravel/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables:
    ```plaintext
    MONGO_URI=<your-mongo-db-uri>
    JWT_SECRET=<your-jwt-secret>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    EMAIL_HOST=<your-mailtrap-host>
    EMAIL_PORT=<your-mailtrap-port>
    EMAIL_USER=<your-mailtrap-username>
    EMAIL_PASS=<your-mailtrap-password>
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Run in production:
    ```bash
    npm start
    ```