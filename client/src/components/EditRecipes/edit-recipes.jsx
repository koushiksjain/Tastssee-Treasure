import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useState and useEffect
import "../../styles/global.css";
import axios from "axios";
import "./edit-recipes.css";

export const EditRecipes = () => {
  const location = useLocation();
  const dataReceived = location.state;
  console.log(dataReceived);
  const navigate = useNavigate();

  const [user_id, setUser_id] = useState("");
  const [editRecipe, setEditRecipe] = useState({});

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

  useEffect(() => {
    const fetchEditRecipe = async () => {
      console.log("hit");

      try {
        console.log(dataReceived);
        // Call the unlike API
        const response = await axios.get(
          "http://localhost:8080/api/recipe_store/edit_recipe/",
          {
            params: {
              recipe_id: dataReceived,
            },
          }
        );
        setEditRecipe(response.data);
      } catch (error) {
        console.error("Error in deleting recipe:", error);
        alert("An error occurred while deleting the recipe.");
      }
    };
    fetchEditRecipe();
  }, [dataReceived]);

  const [recipe, setRecipe] = useState({
    recipe_id: "",
    user_id: "",
    title: "",
    ingredients:"",
    description: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        setRecipe({
          ...recipe,
          recipe_id: dataReceived,
          user_id: user_id,
          photo: file,
        });

        // Generate image preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(file);
      }
    } else {
      setRecipe({
        ...recipe,
        recipe_id: dataReceived,
        user_id: user_id,
        [name]: value,
      });
    }
  };

  console.log(recipe);

  const handleSubmit = async (e) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to edit this recipe?"
    );
    if (confirmRemove) {
      if (!recipe.recipe_id) {
        navigate("/profile");
      } else {
        e.preventDefault();
        const formData = new FormData();
        formData.append("recipe_id", dataReceived);
        formData.append("user_id", user_id);
        formData.append(
          "title",
          recipe.title ? recipe.title : editRecipe.title
        );
        formData.append(
          "ingredients",
          recipe.ingredients ? recipe.ingredients : editRecipe.ingredients
        );
        formData.append(
          "description",
          recipe.description ? recipe.description : editRecipe.description
        );
        if (recipe.photo instanceof File) {
          formData.append("photo", recipe.photo);
        } else {
          console.warn("Photo is not a valid File object");
        }

        try {
          formData.forEach((value, key) => {
            console.log(`${key}:`, value);
          });

          const response = await axios.post(
            "http://localhost:8080/api/recipe_store/update_recipe/",
            formData, // Pass formData directly
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          alert("Recipe added successfully!");
          navigate("/profile");
          setRecipe({
            recipe_id: response.data.recipe_id,
            user_id: user_id,
            title: "",
            ingredients:"",
            description: "",
            photo: null,
          });
          setPreview(null);
        } catch (error) {
          console.error("Error adding recipe:", error);
        }
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: "75vh" }}>
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
            Update Your Recipe!
          </h2>

          {/* Flex container for layout */}
          <div className="flex flex-wrap lg:flex-nowrap">
            {/* Left side: Upload Photo */}
            <div
              style={{ height: "58vh" }}
              className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center"
            >
              <div
                style={{ height: "50vh", width: "40vh" }}
                className="w-48 h-48 mb-4 border border-gray-200 rounded overflow-hidden flex items-center justify-center"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={`http://localhost:8080/${editRecipe.photo}`}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
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
              <div className="mb-2">
                <label
                  htmlFor="recipeName"
                  className="text-2xl mb-2 block text-yellow-700 px-4"
                >
                  Title
                </label>
                <input
                  id="recipeName"
                  name="title"
                  type="text"
                  placeholder="Recipe Name"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded text-1xl"
                  // value={recipe.title}
                  onChange={handleChange}
                  defaultValue={editRecipe.title}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="recipeDesc"
                  className="text-2xl mb-2 block text-yellow-700 px-4"
                >
                  Ingredients
                </label>
                <textarea
                  id="recipeIngr"
                  name="ingredients"
                  rows="3"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded "
                  onChange={handleChange}
                  defaultValue={editRecipe.ingredients}
                ></textarea>
              </div>

              <div className="mb-1">
                <label
                  htmlFor="recipeDesc"
                  className="text-2xl mb-2 block text-yellow-700 px-4"
                >
                  Description
                </label>
                <textarea
                  id="recipeDesc"
                  name="description"
                  rows="3"
                  className="w-3/4 h-3/2 p-2 border border-gray-200 rounded "
                  onChange={handleChange}
                  defaultValue={editRecipe.description}
                ></textarea>
              </div>

              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded ml-auto"
                type="submit"
              >
                Edit
              </button>
              <Link to="/profile">
                <button
                  className="bg-blue-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded ml-auto relative left-5"
                  type="submit"
                >
                  Go Back
                </button>
              </Link>
            </div>
          </div>

          {/* Submit button */}
        </div>
      </div>
    </form>
  );
};
