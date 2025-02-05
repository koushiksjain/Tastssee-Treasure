import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const location = useLocation();
  const dataReceived = location.state;

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLikedRecipes, setIsLikedRecipes] = useState({});
  const [isBookmarkedRecipes, setIsBookmarkedRecipes] = useState({});
  const [isLoadingL, setIsLoadingL] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);

  useEffect(() => {
    if (dataReceived) {
      const fetchRequiredRecipes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/recipe_store/user_required_recipe",
            {
              params: {
                recipe_id: dataReceived,
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
      fetchRequiredRecipes();
    }

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
          setUser_id(data._id); // Update username state

          const likedState = data.likes.reduce((acc, recipeId) => {
            acc[recipeId] = true; // Mark as liked
            return acc;
          }, {});
          setIsLikedRecipes(likedState);

          const BookmarkedState = data.bookmarks.reduce((acc, recipeId) => {
            acc[recipeId] = true; // Mark as liked
            return acc;
          }, {});
          setIsBookmarkedRecipes(BookmarkedState);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dataReceived]);

  const toggleLike = async (recipe_id) => {
    // Use `isLikedRecipes` as an object to track each recipe's like state
    const isLiked = isLikedRecipes[recipe_id] || false;
    setIsLikedRecipes({ ...isLikedRecipes, [recipe_id]: !isLiked }); // Optimistic update
    setIsLoadingL(true);

    try {
      if (!isLiked) {
        console.log("Liking the recipe...");
        console.log(recipe_id);
        await axios.post("http://localhost:8080/api/like_recipe/like/", {
          user_id: user_id,
          recipe_id: recipe_id,
        });
        console.log("Recipe liked successfully!");
      } else if (isLiked) {
        console.log("Disliking the recipe...");
        await axios.post("http://localhost:8080/api/like_recipe/dislike/", {
          user_id: user_id,
          recipe_id: recipe_id,
        });
        console.log("Recipe disliked successfully!");
      }
    } catch (error) {
      console.error("Error while toggling like:", error);
      // Revert optimistic update on error
      setIsLikedRecipes({ ...isLikedRecipes, [recipe_id]: isLiked });
    } finally {
      console.log(isLikedRecipes);
      setIsLoadingL(false); // Reset loading state
    }
  };

  const toggleBookmark = async (recipe_id) => {
    // Use `isLikedRecipes` as an object to track each recipe's like state
    const isBookmarked = isBookmarkedRecipes[recipe_id] || false;
    setIsBookmarkedRecipes({
      ...isBookmarkedRecipes,
      [recipe_id]: !isBookmarked,
    }); // Optimistic update
    setIsLoadingB(true);

    try {
      if (!isBookmarked) {
        console.log("Liking the recipe...");
        console.log(recipe_id);
        await axios.post(
          "http://localhost:8080/api/bookmark_recipe/bookmark/",
          {
            user_id: user_id,
            recipe_id: recipe_id,
          }
        );
        console.log("Recipe bookmarked successfully!");
      } else if (isBookmarked) {
        console.log("Disliking the recipe...");
        await axios.post(
          "http://localhost:8080/api/bookmark_recipe/remove_bookmark/",
          {
            user_id: user_id,
            recipe_id: recipe_id,
          }
        );
        console.log("Recipe bookmarked removed successfully!");
      }
    } catch (error) {
      console.error("Error while toggling bookmark:", error);
      // Revert optimistic update on error
      setIsBookmarkedRecipes({
        ...isBookmarkedRecipes,
        [recipe_id]: isBookmarked,
      });
    } finally {
      console.log(isLikedRecipes);
      setIsLoadingB(false); // Reset loading state
    }
  };

  return (
    <div
      className="bg-gray-100"
      style={{ backgroundImage: "url('/pattern-bg.png')", height: "75vh" }}
    >
      <main className="container mx-auto">
        <h1 className="text-4xl py-2 font-bold text-yellow-500 text-center">
          {recipes.title}
        </h1>
        <div className="w-64 border-t-4 border-yellow-500 mx-auto mb-8"></div>

        {/* Recipe Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-8">
          {/* Left Content */}
          <div
            style={{ left: "100px" }}
            className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-8 relative"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Making Process
            </h2>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Ingredients:
            </p>
            <p className="mt-2 text-gray-600">
              {recipes.ingredients}
            </p>

            <p className="mt-4 text-lg font-semibold text-gray-700">
              Description:
            </p>
            <p className="mt-2 text-gray-600">{recipes.description}</p>
            <div className="flex-1">
              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  className={`text-yellow-500 text-sm ${
                    isLoadingL ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isLoadingL && toggleLike(recipes._id)} // Prevent multiple clicks while loading
                  disabled={isLoadingL}
                >
                  <i
                    className={
                      isLikedRecipes[recipes._id]
                        ? "fas fa-heart"
                        : "far fa-heart"
                    }
                  ></i>{" "}
                  Like Recipe
                </button>
                <button
                  type="button"
                  className={`text-yellow-500 text-sm ${
                    isLoadingB ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isLoadingB && toggleBookmark(recipes._id)}
                >
                  <i
                    className={
                      isBookmarkedRecipes[recipes._id]
                        ? "fas fa-bookmark"
                        : "far fa-bookmark"
                    }
                  ></i>{" "}
                  Bookmark Recipe
                </button>
              </div>
            </div>
            <Link to="/search-menu">
              <button className="text-white bg-blue-500 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 relative top-2 ">
                Go back
              </button>
            </Link>
          </div>

          {/* Right Photo */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div
              style={{
                width: "70vh",
                height: "50vh",
                top: "30px",
                left: "30px",
              }}
              className="border-2 border-dashed border-gray-200 relative flex items-center justify-center bg-gray-50 shadow-lg rounded-lg"
            >
              <img
                src={`http://localhost:8080/${recipes.photo}`}
                className="object-contain w-full h-full"
                alt="Recipe"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
