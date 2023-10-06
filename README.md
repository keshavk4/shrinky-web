# Shrinky URL Shortener

Shrinky is a simple URL shortener service built with Next.js, MongoDB, and Node.js. It allows you to create short and memorable URLs from long and complex ones.

## Features

- Shorten long URLs to create compact and easy-to-share links.
- Quick and easy setup with MongoDB.

## Screenshots

![Screenshot 1](https://github-production-user-asset-6210df.s3.amazonaws.com/63634923/273451158-e9348f57-b188-47ce-9215-6d568d712a9a.png)

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/keshavk4/shrinky-web.git
   ```

2. Navigate to the project directory:

   ```sh
   cd shrinky-web
   ```

3. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and provide the following variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   ```

   Replace `your_mongodb_uri` with your MongoDB connection string.

5. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

6. Open your web browser and navigate to `http://localhost:3000` to access the application.

### Usage

- To shorten a URL, enter the long URL in the input field and click the "Shrink" button.
- You will receive a shortened URL that you can copy and share.

Visit the [Shrinky URL Shortener Website](https://shrinky-xi.vercel.app/) to start using the service.

## Built With

- [Next.js](https://nextjs.org/) - React framework for server-rendered React applications.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing URL data.
- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side logic.

## License

This project is released under the [MIT License](https://opensource.org/license/mit). See [LICENSE](LICENSE) for more details.