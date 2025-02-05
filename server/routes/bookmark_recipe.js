const router = require("express").Router();
const { User } = require("../models/user");

router.post("/bookmark/", async (req, res) => {
  try {
    const append_bookmark = await User.updateOne(
      { _id: req.body.user_id }, // Match the user by their ID
      { $addToSet: { bookmarks: req.body.recipe_id } } // Add to the `likes` array if it doesn't already exist
    );
    if (append_bookmark.matchedCount === 0) {
      return res.status(401).send({ message: "Invalid user" });
    }

    res.status(200).send({ message: "bookmark added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/remove_bookmark/", async (req, res) => {
  try {
    const remove_bookamrk = await User.updateOne(
      { _id: req.body.user_id }, // Match the user by their ID
      { $pull: { bookmarks: req.body.recipe_id } } // Remove the `recipe_id` from the `likes` array
    );

    if (remove_bookamrk.matchedCount === 0) {
      return res.status(401).send({ message: "Invalid user" });
    }
    console.log("success")
    res.status(200).send({ message: "bookmark removed successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
