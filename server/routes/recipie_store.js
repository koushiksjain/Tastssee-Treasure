const express = require("express");
const multer = require("multer");
const Recipe = require("../models/recipe");
const { User } = require("../models/user");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST route to add a new recipe
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { user_id, title, ingredients, description } = req.body;
    const photo = req.file ? req.file.path : null;

    const newRecipe = new Recipe({
      user_id,
      title,
      ingredients,
      description,
      photo,
    });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find();
    res.status(200).json(recipes); // Send the enriched recipes in the response
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/user_recipe/", async (req, res) => {
  try {
    console.log(req.query);

    // Destructure query parameters directly from req.query
    const { user_id } = req.query;

    // Validate required parameters
    if (!user_id) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Query the database to find the user recipes
    const user_recipes = await Recipe.find({
      user_id: user_id,
    });

    // Handle the case where no recipes are found
    if (user_recipes.length === 0) {
      return res
        .status(200)
        .json({ message: "No recipes found for the given user" });
    }

    // Send the recipes in the response
    res.status(200).json(user_recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/user_liked_recipe/", async (req, res) => {
  const isEmpty = (arr) => {
    return !arr || arr.length === 0 || arr.every((item) => item === null);
  };
  try {
    console.log("like", req.query);

    // Destructure query parameters directly from req.query
    const recipe_id = req.query.recipe_id;

    // Validate required parameters
    if (!recipe_id) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Query the database to find the user recipes

    const user_liked_recipes = [];
    for (const like_id of recipe_id) {
      const liked_recipe = await Recipe.findOne({ _id: like_id }); // Await inside the loop
      if (liked_recipe === null) {
        const remove_like = await User.updateOne(
          { _id: req.query.user_id }, // Match the user by their ID
          { $pull: { likes: like_id } } // Remove the `recipe_id` from the `likes` array
        );
        console.log("success")
      }
      user_liked_recipes.push(liked_recipe); // Use push instead of append
    }

    // Handle the case where no recipes are found
    if (isEmpty(user_liked_recipes)) {
      return res.status(200).json({ message: "No recipes liked by user" });
    }

    const filtered_recipes = user_liked_recipes.filter(
      (recipe) => recipe !== null
    );

    // Send the recipes in the response
    res.status(200).json(filtered_recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/user_bookmarked_recipe/", async (req, res) => {
  const isEmpty = (arr) => {
    return !arr || arr.length === 0 || arr.every((item) => item === null);
  };

  try {
    console.log("bookmark", req.query.recipe_id);

    // Destructure query parameters directly from req.query
    const recipe_id = req.query.recipe_id;


    // Validate required parameters
    if (!recipe_id) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Query the database to find the user recipes

    const user_bookmarked_recipes = [];
    for (const bookmark_id of recipe_id) {
      const bookmarked_recipe = await Recipe.findOne({ _id: bookmark_id }); // Await inside the loop
      if (bookmarked_recipe === null) {
        const remove_bookamrk = await User.updateOne(
          { _id: req.query.user_id }, // Match the user by their ID
          { $pull: { bookmarks: bookmark_id } } // Remove the `recipe_id` from the `likes` array
        );
      }
      user_bookmarked_recipes.push(bookmarked_recipe); // Use push instead of append
    }

    // Handle the case where no recipes are found
    if (isEmpty(user_bookmarked_recipes)) {
      return res
        .status(200)
        .json({ message: "No recipes bookmarked by the given user" });
    }
    const filtered_recipes = user_bookmarked_recipes.filter(
      (recipe) => recipe !== null
    );
    console.log(isEmpty(user_bookmarked_recipes));
    // Send the recipes in the response
    res.status(200).json(filtered_recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/user_required_recipe/", async (req, res) => {
  try {
    console.log(req.query);

    // Destructure query parameters directly from req.query
    const recipe_id = req.query;

    // Validate required parameters
    if (!recipe_id) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Query the database to find the user recipes

    const user_required_recipe = await Recipe.findOne({
      _id: recipe_id.recipe_id,
    }); // Await inside the loop

    // Handle the case where no recipes are found
    if (user_required_recipe.length === 0) {
      return res
        .status(404)
        .json({ error: "No recipes found for the given user" });
    }

    // Send the recipes in the response
    res.status(200).json(user_required_recipe);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.post("/delete_recipe/", async (req, res) => {
  try {
    const removedRecipe = await Recipe.findByIdAndDelete(req.body.recipe_id);

    if (removedRecipe.photo) {
      const filePath = path.join(__dirname, "..", removedRecipe.photo);
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("File deleted successfully:", filePath);
      } else {
        console.log("File not found:", filePath);
      }
    }

    if (!removedRecipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    console.log("Recipe deleted successfully");
    res.status(200).send({ message: "Recipe removed successfully" });
  } catch (error) {
    console.error("Error in deleting recipe:", error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

router.get("/edit_recipe/", async (req, res) => {
  try {
    console.log(req.query);

    // Destructure query parameters directly from req.query
    const recipe_id = req.query;

    // Validate required parameters
    if (!recipe_id) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Query the database to find the user recipes

    const edit_recipe = await Recipe.findOne({
      _id: recipe_id.recipe_id,
    }); // Await inside the loop

    // Handle the case where no recipes are found
    if (edit_recipe.length === 0) {
      return res
        .status(404)
        .json({ error: "No recipes found for the given user" });
    }

    // Send the recipes in the response
    res.status(200).json(edit_recipe);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.post("/update_recipe/", upload.single("photo"), async (req, res) => {
  try {
    console.log(req.body);

    // Destructure query parameters directly from req.query
    const { recipe_id, user_id, title, ingredients, description} = req.body;
    const photo = req.file ? req.file.path : null;
    
    const updateRecipe = await Recipe.findOne({ _id: recipe_id });

    // Validate required parameters
    if (updateRecipe) {
      if (photo) {
        updateRecipe.user_id = user_id;
        updateRecipe.title = title;
        updateRecipe.ingredients = ingredients;
        updateRecipe.description = description;
        if(updateRecipe.photo !== null){
        const oldPhotoPath = path.join(__dirname, "..", updateRecipe.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
          console.log("Old photo deleted:", oldPhotoPath);
        }}
        updateRecipe.photo = photo;
        await updateRecipe.save();
      } else {
        updateRecipe.user_id = user_id;
        updateRecipe.title = title;
        updateRecipe.ingredients = ingredients;
        updateRecipe.description = description;
        await updateRecipe.save();
      }
    } else {
      return res
        .status(404)
        .json({ error: "No recipes found for the given user" });
    }

    // Send the recipes in the response
    res.status(200).json(updateRecipe);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

module.exports = router;
