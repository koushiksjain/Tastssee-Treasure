import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  ///////////////////////////////////////////////
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error_image, setError_image] = useState("");
  const [user_id, setUser_id] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [LikedRecipes, setLikedRecipes] = useState({});
  const [LikedRecipesID, setLikedRecipesID] = useState({});
  const [BookmarkedRecipes, setBookmarkedRecipes] = useState({});
  const [BookmarkedRecipesID, setBookmarkedRecipesID] = useState({});
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
          const data = await response.json();
          setUser_id(data._id); // Parse JSON from the response
          setFirstName(data.firstName); // Update username state
          setLastName(data.lastName);
          setEmail(data.email);
          setLikedRecipesID(data.likes);
          setBookmarkedRecipesID(data.bookmarks);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
    console.log(user_id);

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/update_photo",
          {
            params: {
              user_id: user_id,
            },
          }
        );

        setProfileImage(response.data.imageUrl);
        // Create a URL for the image blob
      } catch (err) {
        setError_image(err.response?.data?.message || "Failed to fetch image");
      }
    };

    fetchProfileImage();
  }, [firstName, lastName, user_id, email]);

  useEffect(() => {
    if (user_id) {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/recipe_store/user_recipe",
            {
              params: {
                user_id: user_id,
              },
            }
          );
          setRecipes(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching recipes:", err);
          setError("Failed to fetch recipes");
        }
      };
      fetchRecipes();
    }
  }, [user_id]);

  useEffect(() => {
    if (LikedRecipesID && Object.keys(LikedRecipesID).length > 0) {
      const fetchLikedRecipes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/recipe_store/user_liked_recipe",
            {
              params: {
                recipe_id: LikedRecipesID,
              },
            }
          );
          setLikedRecipes(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching recipes:", err);
          setError("Failed to fetch recipes");
        }
      };
      fetchLikedRecipes();
    }
  }, [LikedRecipesID]);

  useEffect(() => {
    if (BookmarkedRecipesID && Object.keys(BookmarkedRecipesID).length > 0) {
      const fetchBookmarkedRecipes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/recipe_store/user_bookmarked_recipe",
            {
              params: {
                recipe_id: BookmarkedRecipesID,
              },
            }
          );
          setBookmarkedRecipes(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching recipes:", err);
          setError("Failed to fetch recipes");
        }
      };
      fetchBookmarkedRecipes();
    }
  }, [BookmarkedRecipesID]);

  ////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("recipes");
  const recipesPerPage = 1;

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  // Generate 3 recipe replicas

  const user_recipes_arrray = Array.isArray(recipes)
    ? recipes
    : recipes
    ? [recipes]
    : [];

  const userRecipes = user_recipes_arrray.map((item, index) => ({
    id: index,
    title: item.title,
    image: `http://localhost:8080/${item.photo}`, // Map the `image_url` to `image`
    ingredients: item ? item.ingredients : undefined, // Map the `description` to `content`
    description: item.description, // Map the `description` to `content`
    recipeID: item._id,
  }));

  const user_liked_recipes_arrray = Array.isArray(LikedRecipes)
    ? LikedRecipes
    : LikedRecipes
    ? [LikedRecipes]
    : [];

  const likedRecipes = user_liked_recipes_arrray.map((item, index) => ({
    id: index,
    title: item ? item.title : undefined,
    image: item ? `http://localhost:8080/${item.photo}` : undefined, // Map the `image_url` to `image`
    ingredients: item ? item.ingredients : undefined, // Map the `description` to `content`
    description: item ? item.description : undefined, // Map the `description` to `content`
    recipeID: item ? item._id : undefined,
  }));

  const user_bookmarked_recipes_arrray = Array.isArray(BookmarkedRecipes)
    ? BookmarkedRecipes
    : BookmarkedRecipes
    ? [BookmarkedRecipes]
    : [];

  const bookmarkedRecipes = user_bookmarked_recipes_arrray.map(
    (item, index) => ({
      id: index,
      title: item ? item.title : undefined,
      image: item ? `http://localhost:8080/${item.photo}` : undefined, // Map the `image_url` to `image`
      ingredients: item ? item.ingredients : undefined, // Map the `description` to `content`
      description: item ? item.description : undefined, // Map the `description` to `content`
      recipeID: item ? item._id : undefined,
    })
  );

  // Determine recipes to display based on the active section
  const getRecipes = () => {
    if (activeSection === "liked") {
      return likedRecipes;
    } else if (activeSection === "bookmarked") {
      return bookmarkedRecipes;
    }
    return userRecipes;
  };
  const user_recipes = getRecipes();

  const handleRemoveBookmark = async (recipeId) => {
    console.log("hit");
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this bookmark?"
    );
    if (confirmRemove) {
      try {
        console.log(user_id, recipeId);
        // Call the unlike API
        const response = await axios.post(
          "http://localhost:8080/api/bookmark_recipe/remove_bookmark/",
          {
            user_id: user_id,
            recipe_id: recipeId,
          }
        );
        if (response.status === 200) {
          alert("Bookmark removed successfully.");
          window.location.reload();
        } else {
          alert("Failed to remove bookmark. Please try again.");
        }
      } catch (error) {
        console.error("Error removing bookmark:", error);
        alert("An error occurred while removing the bookmark.");
      }
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    console.log("hit");
    const confirmRemove = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmRemove) {
      try {
        console.log(user_id, recipeId);
        // Call the unlike API
        const response = await axios.post(
          "http://localhost:8080/api/recipe_store/delete_recipe",
          {
            user_id: user_id,
            recipe_id: recipeId,
          }
        );
        if (response.status === 200) {
          alert("Recipe deleted successfully.");
          window.location.reload();
        } else {
          alert("Failed to delete recipe. Please try again.");
        }
      } catch (error) {
        console.error("Error in deleting recipe:", error);
        alert("An error occurred while deleting the recipe.");
      }
    }
  };

  const handleRemoveLike = async (recipeId) => {
    console.log("hit");
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this like?"
    );
    if (confirmRemove) {
      try {
        console.log(user_id, recipeId);
        // Call the unlike API
        const response = await axios.post(
          "http://localhost:8080/api/like_recipe/dislike/",
          {
            user_id: user_id,
            recipe_id: recipeId,
          }
        );
        if (response.status === 200) {
          alert("Like removed successfully.");
          window.location.reload();
        } else {
          alert("Failed to remove like. Please try again.");
        }
      } catch (error) {
        console.error("Error removing like:", error);
        alert("An error occurred while removing the like.");
      }
    }
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = user_recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <div
      className="min-h-screen sm:min-h-[76vh] py-10 px-6"
      style={{ backgroundImage: "url('/pattern-bg.png')" }}
    >
      <div
        style={{ width: "190vh" }}
        className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Profile Info Section */}
        <div
          style={{ height: "60vh", top: "10px" }}
          className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-md relative"
        >
          <h1 className="text-3xl font-semibold mb-6 text-blue-600">
            Your Profile
          </h1>
          <div
            className="w-32 h-32 bg-gray-300 mb-6 border border-black "
            style={{ borderRadius: "20px", left: "15%", position: "sticky" }}
          >
            <img
              src={
                profileImage
                  ? `http://localhost:8080/Profile_uploads/${profileImage} `
                  : "https://placehold.co/100x100"
              }
              alt="User profile"
              className="w-full h-full object-cover rounded-full"
              style={{ objectFit: "contain" }}
            />
          </div>
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            <strong>Username:</strong> {firstName} {lastName}
          </p>
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            <strong>Email:</strong> {email}
          </p>
          <Link to="/edit-profile">
            <button
              style={{
                width: "100px",
                height: "50px",
                left: "15%",
                position: "sticky",
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 mt-4 py-3 rounded-2xl border border-black "
            >
              <strong>Edit Profile</strong>
            </button>
          </Link>
        </div>

        {/* Recipe Navigation and Content Section */}
        <div
          style={{ width: "120vh", height: "auto" }}
          className="rounded-2xl mb-6 bg-white p-4 shadow-md"
        >
          <div className="col-span-2">
            {/* Recipe Navigation Section */}
            <div className="flex space-x-6 mb-6 text-xl flex justify-center items-center">
              <span
                onClick={() => {
                  setActiveSection("recipes");
                  setCurrentPage(1);
                }}
                className={`hover:underline cursor-pointer ${
                  activeSection === "recipes" ? "text-yellow-600" : ""
                }`}
              >
                Recipes
              </span>
              <span
                onClick={() => {
                  setActiveSection("liked");
                  setCurrentPage(1);
                }}
                className={`hover:underline cursor-pointer ${
                  activeSection === "liked" ? "text-yellow-600" : ""
                }`}
              >
                Liked Recipes
              </span>
              <span
                onClick={() => {
                  setActiveSection("bookmarked");
                  setCurrentPage(1);
                }}
                className={`hover:underline cursor-pointer ${
                  activeSection === "bookmarked" ? "text-yellow-600" : ""
                }`}
              >
                Bookmarked Recipes
              </span>
            </div>

            {/* Recipe Card */}
            {console.log(currentRecipes)}
            {
              // currentRecipes.length > 0 ? (
              currentRecipes.map((recipe) => (
                <div key={recipe.id}>
                  {activeSection === "recipes" && (
                    <h1 className="text-4xl font-semibold mb-4 text-yellow-600 underline">
                      Your Recipes
                    </h1>
                  )}
                  {activeSection === "liked" && (
                    <h1 className="text-4xl font-semibold mb-4 text-red-600 underline">
                      Your Liked Recipes
                    </h1>
                  )}
                  {activeSection === "bookmarked" && (
                    <h1 className="text-4xl font-semibold mb-4 text-blue-600 underline">
                      Your Bookmarked Recipes
                    </h1>
                  )}
                  {recipe.title ? (
                    <div className="flex items-center justify-center space-x-6 mb-6 p-4 border rounded-lg shadow-md bg-white">
                      <div className="w-1/3 flex justify-center">
                        <img
                          className="rounded-lg object-contain bg-gray-200"
                          src={recipe.image}
                          alt="Recipe"
                          style={{
                            height: "35vh",
                            width: "100%"
                          }}
                        />
                      </div>
                      <div className="w-2/3 pl-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {recipe.title}
                        </h3>
                        <p>
                          <b>Ingredients :</b> {recipe.ingredients}
                        </p>
                        <p>
                          <b>Description:</b> {recipe.description}
                        </p>
                        <div className="grid gap-2 mt-4">
                          {activeSection === "recipes" && (
                            <>
                              <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-3 mb-3 rounded-2xl border border-black"
                                onClick={() =>
                                  navigate("/edit-recipes", {
                                    state: recipe.recipeID,
                                  })
                                }
                              >
                                <strong>Edit Recipe</strong>
                              </button>

                              <button
                                className="bg-red-500 hover:bg-red-600 text-black px-3 py-3 rounded-2xl border border-black"
                                onClick={() =>
                                  handleDeleteRecipe(recipe.recipeID)
                                }
                              >
                                <strong>Delete Recipe</strong>
                              </button>
                            </>
                          )}
                          {activeSection === "liked" && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-black px-3 py-3 rounded-2xl border border-black"
                              onClick={() => handleRemoveLike(recipe.recipeID)}
                            >
                              <strong>Unlike Recipe</strong>
                            </button>
                          )}
                          {activeSection === "bookmarked" && (
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-3 rounded-2xl border border-black"
                              onClick={() =>
                                handleRemoveBookmark(recipe.recipeID)
                              }
                            >
                              <strong>Remove Bookmark</strong>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {activeSection === "recipes" && (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex mb-2 flex justify-center items-center">
                            <div className="w-1/2">
                              <Link to="/add-menu">
                                <img
                                  src="/recipes.png" // Replace with the actual path to your image
                                  alt="No recipes available"
                                  className="rounded-lg shadow-md"
                                  style={{
                                    height: "35vh",
                                    width: "35vw",
                                    objectFit: "contain",
                                    backgroundColor: "gray",
                                    position: "sticky",
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeSection === "liked" && (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex mb-2 flex justify-center items-center">
                            <div className="w-1/2">
                              <Link to="/search-menu">
                                <img
                                  src="/no-liked-recipes.jpeg" // Replace with the actual path to your image
                                  alt="No recipes available"
                                  className="rounded-lg shadow-md"
                                  style={{
                                    height: "35vh",
                                    width: "35vw",
                                    objectFit: "contain",
                                    backgroundColor: "gray",
                                    position: "sticky",
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeSection === "bookmarked" && (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex mb-2 flex justify-center items-center">
                            <div className="w-1/2">
                              <Link to="/search-menu">
                                <img
                                  src="/no-bookmarked.jpeg" // Replace with the actual path to your image
                                  alt="No recipes available"
                                  className="rounded-lg shadow-md"
                                  style={{
                                    height: "35vh",
                                    width: "35vw",
                                    objectFit: "contain",
                                    backgroundColor: "gray",
                                    position: "sticky",
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            }
            {/* Pagination */}
            <div className="flex justify-between items-center">
              {currentPage > 1 && (
                <span
                  className="text-yellow-500 text-lg cursor-pointer"
                  onClick={prevPage}
                >
                  Previous
                </span>
              )}
              <span className="font-semibold text-lg">Page {currentPage}</span>
              {currentPage <
                Math.ceil(user_recipes.length / recipesPerPage) && (
                <span
                  className="text-yellow-500 text-lg cursor-pointer"
                  onClick={nextPage}
                >
                  Next
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
