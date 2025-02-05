const router = require("express").Router();
const { User } = require("../models/user");

router.post("/like/", async (req, res) => {
  try {
    const append_like = await User.updateOne(
      { _id: req.body.user_id }, // Match the user by their ID
      { $addToSet: { likes: req.body.recipe_id } } // Add to the `likes` array if it doesn't already exist
    );
    if (append_like.matchedCount === 0) {
      return res.status(401).send({ message: "Invalid user" });
    }

    res.status(200).send({ message: "like added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/dislike/", async (req, res) => {
  try {
    const remove_like = await User.updateOne(
      { _id: req.body.user_id }, // Match the user by their ID
      { $pull: { likes: req.body.recipe_id } } // Remove the `recipe_id` from the `likes` array
    );

    if (remove_like.matchedCount === 0) {
      return res.status(401).send({ message: "Invalid user" });
    }

    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
