import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "./home.css";
import axios from "axios";

export const Home = () => {
  ////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const [user_id, setUser_id] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [LikedRecipes, setLikedRecipes] = useState({});
  const [LikedRecipesID, setLikedRecipesID] = useState({});
  const [BookmarkedRecipes, setBookmarkedRecipes] = useState({});
  const [BookmarkedRecipesID, setBookmarkedRecipesID] = useState({});
  const [isLoadingL, setIsLoadingL] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);

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
  }, []);

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

  ////////////////////////////////////////////////////////
  const [rotate, setRotate] = useState(0); // Tracks rotation
  const [active, setActive] = useState(0); // Tracks active item
  const imageRef = useRef(null); // Ref for the image container
  const contentsRef = useRef([]); // Ref for the content items

  const totalImages = Array.isArray(recipes) ? recipes.length : 1;
  const angle = 360 / totalImages;
  const radius = 100;

  const nextSlider = () => {
    setActive((prevActive) => (prevActive + 1) % totalImages);
    setRotate((prevRotate) => prevRotate - angle);
  };

  const prevSlider = () => {
    setActive((prevActive) => (prevActive - 1 + totalImages) % totalImages);
    setRotate((prevRotate) => prevRotate + angle);
  };

  useEffect(() => {
    // Apply rotation to each `.item` instead of `.images`
    document.querySelectorAll(".images .item").forEach((item, index) => {
      const rotation = rotate + index * angle;
      item.style.transform = `rotate(${rotation}deg) translateY(-${radius}vh)`;
    });

    contentsRef.current.forEach((content, index) => {
      if (content) {
        content.classList.toggle("active", index === active);
      }
    });

    // Auto-slide every 3 seconds
    const autoNext = setInterval(nextSlider, 3000);
    return () => clearInterval(autoNext); // Cleanup interval on unmount
  }, [rotate, active, totalImages, radius]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const bookmarkedRecipesArray = Array.isArray(BookmarkedRecipes)
    ? BookmarkedRecipes
    : BookmarkedRecipes
    ? [BookmarkedRecipes]
    : [];

  const likedRecipesArray = Array.isArray(LikedRecipes)
    ? LikedRecipes
    : LikedRecipes
    ? [LikedRecipes]
    : [];

  const slides = likedRecipesArray.map((item) => ({
    image: item ? `http://localhost:8080/${item.photo}` : undefined, // Map the `image_url` to `image`
    title: item ? item.title : undefined, // Map the `description` to `content`
  }));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  /////
  return (
    <main>
      <div id="main" style={{backgroundImage: "url('/background.jpeg')"}}>
        <div id="page1">
          <h1 className="border" style={{ width: "180vh", borderRadius: "10px" }}>Discover Recipe & Delicious Food</h1>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ backgroundColor: "yellow"}}>
            </svg>
          </span>
          <div className="downtitle border" style={{ width: "180vh", borderRadius: "5px" }}>
          <p style={{ width: "180vh", borderRadius: "5px" }}>
            Discover, organize, and manage your favorite recipes. Enhance your
            cooking journey with ease and creativity.
          </p>
          </div>
          <div className="moving-div">
            <div className="blur-left"></div>
            <div className="move">
              <img src="frame-13.png" alt="Chef Hat" decoding="async" />
              <img src="frame-15.png" alt="Spatula" decoding="async" />
              <img src="frame-17.png" alt="Pan" decoding="async" />
              <img src="frame-21.png" alt="Whisk" decoding="async" />
              <img src="frame-9.png" alt="Knife" decoding="async" />
              <img src="frame-24.png" alt="Bowl" decoding="async" />
              <img src="frame-16.png" alt="Spoon" decoding="async" />
              <img src="frame-22.png" alt="Fork" decoding="async" />
              <img src="frame-13.png" alt="Chef Hat" decoding="async" />
              <img src="frame-15.png" alt="Spatula" decoding="async" />
              <img src="frame-17.png" alt="Pan" decoding="async" />
              <img src="frame-21.png" alt="Whisk" decoding="async" />
              <img src="frame-9.png" alt="Knife" decoding="async" />
              <img src="frame-24.png" alt="Bowl" decoding="async" />
              <img src="frame-16.png" alt="Spoon" decoding="async" />
              <img src="frame-22.png" alt="Fork" decoding="async" />
            </div>
            <div className="blur-right"></div>
          </div>
        </div>
        {/* Recipes */}
        <div className="slider1" style={{ "--radius": `${radius}px` }}>
          {recipes.message ? (
            <>
              <div
                className="title"
                style={{ top: "25%", left: "25%", margin: "10px" }}
              >
                Wating for your Recipes
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="title">Your Recipes</div>
              <div
                className="images"
                style={{ "--totalImages": totalImages, "--radius": `${radius}px` }}
                ref={imageRef}
              >
                {recipes &&
                  (Array.isArray(recipes) ? recipes : [recipes]).map(
                    (recipe, index) => (
                      <div
                        className="item"
                        style={{ "--i": index + 1 }}
                        key={recipe.recipe_id}
                      >
                        <img
                          src={`http://localhost:8080/${recipe.photo}`}
                          alt={`Image of ${recipe.title}`}
                          style={{
                            objectFit: "contain",
                            backgroundColor: "grey",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    )
                  )}
              </div>
              <div className="content border" style={{width: "60vh", borderRadius: "10px", borderColor:"black", backgroundColor: "#fdc0c2"}}>
                {recipes &&
                  (Array.isArray(recipes) ? recipes : [recipes]).map(
                    (recipe, index) => (
                      <div
                        className={`item ${index === 0 ? "active" : ""}`}
                        ref={(el) => (contentsRef.current[index] = el)}
                        key={index}
                      >
                        <h1>{recipe.title}</h1>
                        <div
                          className="des"
                          style={{ color: "black", textAlign: "center" }}
                        >
                          {recipe.description}
                        </div>
                        <button
                          onClick={() =>
                            navigate("/recipes", { state: recipe._id })
                          }
                        >
                          See more
                        </button>
                      </div>
                    )
                  )}
              </div>
              <button id="prev" onClick={prevSlider}>
                {"<"}
              </button>
              <button id="next" onClick={nextSlider}>
                {">"}
              </button>{" "}
            </>
          )}
        </div>
        {/* Liked Recipes */}
        <div className="page4">
          <section className="custom-slider-container">
            <h2 className="underline py-5">Your's Liked Recipes</h2>
            <div className="custom-slider">
              <button onClick={prevSlide} className="slider-nav prev">
                ❮
              </button>
              <div className="slider-wrapper">
                {slides.map((slide, index) => {
                  const position =
                    (index - currentIndex + slides.length) % slides.length;
                  let className = "slider-item";

                  if (position === 0) className += " center-slide";
                  else if (position === 1 || position === slides.length - 1)
                    className += " side-slide";
                  else className += " hidden-slide";

                  return (
                    <>
                      {slide.title ? (
                        <div key={index} className={className}>
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="slide-image"
                          />

                          <p className="slide-content border rounded"style={{color: "black", backgroundColor: "#fdc0c2",
  borderColor: "#000"}}>{slide.title}</p>
                        </div>
                      ) : (
                        <img
                          src="/no-liked-recipes.jpeg"
                          alt="slider-image"
                          className={className}
                          style={{ height: "500px" }}
                        />
                      )}
                    </>
                  );
                })}
              </div>
              <button onClick={nextSlide} className="slider-nav next">
                ❯
              </button>
            </div>
            <div className="pagination">
              {slides.map((_, index) => (
                <div>
                  <span
                    key={index}
                    className={`pagination-dot ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  ></span>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* Bookmarked Recipes */}
        <div className="page7">
          <div className="title1 underline py-5">
            <h1>Your's Bookmarked Recipes</h1>
          </div>
          <div
            class="slider"
            reverse="true"
            style={{
              "--width": "250px",
              "--height": "350px",
              "--quantity": bookmarkedRecipesArray.length,
            }}
          >
            {console.log(bookmarkedRecipesArray)}
            {bookmarkedRecipesArray.map((_, index) => (
              <>
              {/* {console.log(_.photo)} */}
                {_.photo ? (
                  <div class="list">
                    <div
                      className="item"
                      style={{ "--position": index + 1 }}
                      key={index}
                    >
                      <img
                        src={_.photo ? `http://localhost:8080/${_.photo}` : "/frame-13.png"}
                        alt="slider item"
                        style={{
                          height: "300px",
                          objectFit: "contain",
                          backgroundColor: "grey",
                        }}
                      />
                      <p className="slide-content border rounded mt-1"style={{color: "black", backgroundColor: "#fdc0c2",
  borderColor: "#000", textAlign:"center"}}>{_.title}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src="/no-bookmarked.jpeg"
                    alt="slider item"
                    style={{
                      height: "300px",
                      right: "40%",
                      position: "absolute",
                    }}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
