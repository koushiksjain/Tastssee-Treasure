# Tastssee Treasure 🚀
![Logo of Tastssee Treasure](/client/public/logo%201.png)
#
Tastssee Treasure is a user-friendly web application that allows users to perform CRUD operations seamlessly. It enables users to log in, create and share recipes, explore other users' recipes, like, and bookmark their favorite ones for future reference.

## 🛠 Tech Stack

### Frontend:

- React.js

### Backend:

- Node.js
- Express.js

### Database:

- MongoDB

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### 🔹 Installation

Clone the repository:

```sh
git clone https://github.com/Lakshmish0/Dishcovery.git
cd TastsseeTreasure
```

### 🔹 Setup Frontend

Navigate to the frontend directory and install dependencies:

```sh
cd client
npm install
npm start
```

This will start the React development server on `http://localhost:3000/`.

### 🔹 Setup Backend

Navigate to the backend directory and install dependencies:

```sh
cd ../server
npm install
npm start
```

The backend server will run on `http://localhost:8080/`.

### 🔹 Setup MongoDB & Import Sample Collections

Ensure you have installed [MongoDB Shell](https://www.mongodb.com/try/download/shell)

Ensure MongoDB is running locally or set up a cloud MongoDB instance.

1. Create a `.env` file in the server directory:

```sh
DB = "mongodb://localhost:27017/Tastssee_treasure"
JWTPRIVATEKEY = "PRIVATE_KEY"
SALT = 10
```

2. Import database collections using MongoDB CLI:

Ensure you have installed [MongoDB CLI](https://www.mongodb.com/try/download/database-tools)

```sh
mongoimport --db Tastssee_treasure --collection users --file "sample_data/Tastssee_treasure.users.json" --jsonArray

mongoimport --db Tastssee_treasure --collection profile_photos --file "sample_data/Tastssee_treasure.profile_photos.json" --jsonArray

mongoimport --db Tastssee_treasure --collection recipes --file "sample_data/Tastssee_treasure.recipes.json" --jsonArray
```

#### Using MongoDB Compass:

Ensure you have installed [MongoDB Compass](https://www.mongodb.com/try/download/compass)

1. Open **MongoDB Compass** and connect to `mongodb://localhost:27017`.

2. Click on `Create Database`, name it **Tastssee_treasure**, and create collections `users`,`profile_photos` and `recipes`.

3. Import data manually:
   - Open the `users` collection, click `Import Data`, and select `sample_data/Tastssee_treasure.users.json`.
   - Open the `profile_photos` collection, click `Import Data`, and select `sample_data/Tastssee_treasure.profile_photos.json`.
   - Open the `recipes` collection, click `Import Data`, and select `sample_data/Tastssee_treasure.recipes.json`.
4. Ensure collections are populated correctly by viewing them in MongoDB Compass.

### To edit the sample collection

Ensure you have imported the sample data into MongoDB, then login in with the following credentials:

```sh

Email: recipes1@gmail.com
Password: Recipes@123

```

---

## 👥 Contributors

- [Lakshmish](https://github.com/Lakshmish0)
- [Koushik S Jain](https://github.com/koushiksjain)

Want to contribute? See the guidelines below!

---

## 🤝 Contribution Guidelines

We welcome contributions to enhance the project! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Create a Pull Request.

### Project Structure

```
TastsseeTreasure/
│-- client/   # React.js Frontend
│-- server/    # Express.js Backend
│-- sample_data/       # JSON Data for MongoDB import
│-- README.md   # Project Documentation
```

Thank you for contributing! 🎉

