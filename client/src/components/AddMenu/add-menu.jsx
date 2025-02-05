import React, { useState, useEffect } from "react"; // Added useState and useEffect
import "../../styles/global.css";
import axios from "axios";
import "./add-menu.css";

export const AddMenu = () => {
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        if (!token) {
          console.error("No token found. Please login.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/username", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json(); // Parse JSON from the response
          setUser_id(data._id);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const [recipe, setRecipe] = useState({
    user_id: "",
    title: "",
    ingredients: "",
    description: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        setRecipe({ ...recipe, photo: file });

        // Generate image preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(file);
      }
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("description", recipe.description);
    formData.append("photo", recipe.photo);
    console.log(user_id);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/recipe_store",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Recipe added successfully!");
      setRecipe({
        user_id: user_id,
        title: "",
        ingredients: "",
        description: "",
        photo: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen sm:min-h-[76vh]"
      style={{ backgroundImage: "url('/pattern-bg.png')" }}
    >
      <div
        style={{
          backgroundColor: "black",
          backgroundImage: "url('/pattern-bg.png')",
        }}
        className="w-full"
      >
        <div
          className="container mx-auto p-3 bg-white"
          style={{ backgroundImage: "url('/pattern-bg.png')" }}
        >
          <h2
            style={{
              width: "500px",
              textAlign: "center",
            }}
            className="mb-4 border-b-4 border-yellow-500 font-bold p-2"
          >
            Add The Recipe Of Your Choice!
          </h2>

          {/* Flex container for layout */}
          <div className="flex flex-wrap lg:flex-nowrap">
            {/* Left side: Upload Photo */}
            <div
              style={{ height: "58vh" }}
              className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center"
            >
              <div
                style={{
                  height: "50vh",
                  width: "40vh",
                  backgroundColor: "white",
                }}
                className="w-48 h-48 mb-4 border border-gray-200 rounded overflow-hidden flex items-center justify-center"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-6xl text-gray-200">Photo</span>
                )}
              </div>
              <input
                type="file"
                id="upload"
                name="photo"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
              <label
                htmlFor="upload"
                className="bg-yellow-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded cursor-pointer"
              >
                Upload Photo
              </label>
            </div>

            {/* Right side: Form inputs */}
            <div className="w-full lg:w-2/3">
              <div className="mb-3">
                <label
                  htmlFor="recipeName"
                  className="text-2xl block text-yellow-700 px-4"
                >
                  Title
                </label>
                <input
                  id="recipeName"
                  name="title"
                  type="text"
                  placeholder="Recipe Name"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded text-1xl"
                  value={recipe.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="recipeDesc"
                  className="text-2xl block text-yellow-700 px-4"
                >
                  Ingredients
                </label>
                <textarea
                  id="recipeIngr"
                  name="ingredients"
                  rows="3"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded "
                  value={recipe.ingredients}
                  onChange={handleChange}
                  placeholder="Describe your Recipe"
                ></textarea>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="recipeDesc"
                  className="text-2xl block text-yellow-700 px-4"
                >
                  Description
                </label>
                <textarea
                  id="recipeDesc"
                  name="description"
                  rows="3"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded "
                  value={recipe.description}
                  onChange={handleChange}
                  placeholder="Describe your Recipe"
                ></textarea>
              </div>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded ml-auto"
                type="submit"
              >
                Add Recipe !!!
              </button>
            </div>
          </div>

          {/* Submit button */}
        </div>
      </div>
    </form>
  );
};
