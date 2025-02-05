import React, { useEffect, useState } from "react";
import "./search-menu.css";
import { Link, useNavigate } from "react-router-dom";

export const SearchMenu = () => {
  //////////////////////////////////
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstIndex, lastIndex);
  const numbers = [...Array(totalPages).keys()].map((n) => n + 1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/recipe_store"); // Adjust URL if needed
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  ///////////////////////////////////

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="min-h-screen sm:min-h-[76vh] py-4 px-6" style={{ backgroundImage: "url('/pattern-bg.png')"}}>
      <div className="mb-4 flex items-center justify-center">
        <h1 className=" px-10 text-3xl font-bold text-gray-800 rounded-md p-2">
          Search Your Cravings Here!!
        </h1>
        <form onChange={(e) => setSearch(e.target.value)}>
          <div className="items-end" style={{width:"500px"}}>
            <input
              type="search"
              placeholder="Enter recipe name, ingredients"
              className="px-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </div>

      <hr className="border-t border-gray-200 my-6" />

      {/* Recipe Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {loading && (
          <p className="text-center text-gray-500 col-span-4">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 col-span-4">{error}</p>
        )}

        {console.log(currentRecipes)}
        {currentRecipes
          .filter((recipe) => {
            return search.toLowerCase() === ""
              ? recipe
              : recipe.title.toLowerCase().includes(search);
          })
          .map((recipe) => (
            <button
              key={recipe._id}
              onClick={() => navigate("/recipes", { state: recipe._id })}
              className="w-full"
            >
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                {/* Image Container */}
                <div className="w-full h-60 flex justify-center items-center bg-gray-300 overflow-hidden">
                  <img
                    src={
                      recipe.photo
                        ? `http://localhost:8080/${recipe.photo}`
                        : "https://placehold.co/200x200"
                    }
                    alt={`Image of ${recipe.title}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Title */}
                <h3 className="mt-4 text-center text-lg font-semibold px-2 py-2">
                  {recipe.title}
                </h3>
              </div>
            </button>
          ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="text-center my-8 flex justify-center items-center space-x-4">
          {currentPage > 1 && (
            <span
              className="text-yellow-500 text-lg cursor-pointer mr-4"
              onClick={prevPage}
            >
              {"<"}
            </span>
          )}

          {numbers.map((number) => (
            <span
              key={number}
              className={`text-lg cursor-pointer px-3 py-1 ${
                number === currentPage
                  ? "bg-yellow-500 text-white rounded-md"
                  : "text-gray-600"
              }`}
              onClick={() => changeCPage(number)}
            >
              {number}
            </span>
          ))}

          {currentPage < totalPages && (
            <span
              className="text-yellow-500 text-lg cursor-pointer ml-4"
              onClick={nextPage}
            >
              {">"}
            </span>
          )}
        </div>
      )}
    </section>
  );
};
