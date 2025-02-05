const router = require("express").Router();
const { User } = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    try {
        // Find the user by their ID from the decoded token
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({ message: "User not found" });
        // Return first and last name
        res.status(200).send({
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            likes: user.likes,
            bookmarks: user.bookmarks,
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;