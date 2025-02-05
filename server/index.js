require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const usernameRoutes = require('./routes/username');
const recipe_storeRoutes = require('./routes/recipie_store');
const update_userRoutes = require('./routes/update_user');
const user_photoRoutes = require('./routes/update_photo');
const like_recipeRoutes = require('./routes/like_recipe');
const bookmark_recipeRoutes = require('./routes/bookmark_recipe');
const path = require("path");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/username', usernameRoutes);
app.use("/api/recipe_store", recipe_storeRoutes);
app.use("/api/update_user", update_userRoutes);
app.use('/api/update_photo',user_photoRoutes);
app.use('/api/like_recipe',like_recipeRoutes);
app.use('/api/bookmark_recipe',bookmark_recipeRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Profile_uploads", express.static(path.join(__dirname, "Profile_uploads")));



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));