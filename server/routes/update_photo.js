const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ProfilePhoto = require("../models/profile");
const cors = require("cors");
const router = express.Router();
router.use(cors());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../Profile_uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    process.nextTick(() => {
      console.log("Request body:", req.body);
      cb(null, file.originalname);
    });
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
    }
    cb(null, true);
  },
});

// Route to get user's current image

router.get("/", async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "Filename is required" });
    }
    const profilePhoto = await ProfilePhoto.findOne({
      user_id: user_id,
    });

    if (!profilePhoto) {
      const imageUrl = null;
      return res.json({
        imageUrl,
        message: "No profile photo found for the provided details",
      });
    }
    const imageUrl = `${profilePhoto.photo}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to upload a new image
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("this is log", req.body);
    const { user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    let profilePhoto = await ProfilePhoto.findOne({
      user_id: user_id,
    });

    if (!profilePhoto) {
      // Create a new profile photo record if it doesn't exist
      const newProfilePhoto = new ProfilePhoto({
        user_id: user_id,
        photo: req.file.filename,
      });
      await newProfilePhoto.save();
      return res
        .status(201)
        .json({ message: "Profile photo added successfully!" });
    } else {
      // Delete the old image if it exists
      if (profilePhoto) {
        const oldImagePath = path.join(
          __dirname,
          "../Profile_uploads",
          profilePhoto.photo
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update the profile photo record with the new image
      profilePhoto.user_id = user_id;
      profilePhoto.photo = req.file.filename;

      await profilePhoto.save();
      return res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: `/Profile_uploads/${req.file.filename}`,
      });
    }
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/delete_photo/", async (req, res) => {
  try {
    const userid = req.body.user_id;

    if (!userid) {
      return res.status(400).json({ message: "Filename is required" });
    }

    const profile = await ProfilePhoto.findOneAndDelete({ user_id: userid });
    console.log(userid);
    if (profile) {
      const oldImagePath = path.join(
        __dirname,
        "../Profile_uploads",
        profile.photo
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    } else {
      return res.status(404).json({ message: "user not found" });
    }

    console.log("User deleted successfully");
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
