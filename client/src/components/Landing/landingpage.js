import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { locomotiveScroll, loaderAnimation, navBarAnimation, miniInteractElem, headerSectionAnimation, textSliderAnimation, featuredAnimate, exclusiveDealsAnimate, whatInsideAnimate, footerAnimate } from "./land.js";
import "./landingpage.css";

// Import assets
import logo from "../../assets/images/logo 1.png";
import frame7 from "../../assets/images/frame-7.png";
import frame9 from "../../assets/images/frame-9.png";
import upRightArrowBlack from "../../assets/images/up-right-arrow-black.png";
import arrowElemImg from "../../assets/images/arrow-elem-img.png";
import IndianChefBgImg from "../../assets/images/indian-food-chef.png";
import whatInsideSecArrow1 from "../../assets/images/what-inside-sec-arrow.png";

function LandingPage() {
  const mainRef = useRef(null); // Reference to the main container

  useEffect(() => {
    if (mainRef.current) {
      setTimeout(() => {
        locomotiveScroll();
        loaderAnimation();
        navBarAnimation();
        miniInteractElem();
        headerSectionAnimation();
        textSliderAnimation();
        featuredAnimate();
        exclusiveDealsAnimate();
        whatInsideAnimate();
        footerAnimate();
      }, 0); // Slight delay to allow the DOM to load
    }
    else {
      console.log('mainRef is not defined');
    }
  }, []); // Empty dependency array to run only once on mount

    return (
        <>
      <div className="loaderAnimate-contain">
        <div className="loaderAnimate-bg">
          <div className="loaderBg-item"></div>
          <div className="loaderBg-item"></div>
          <div className="loaderBg-item"></div>
          <div className="loaderBg-item"></div>
        </div>
      </div>
      <div className="wrapper" id="main" ref={mainRef}>
        {/* Header Section */}
        <div className="hero-sec-main">
          <div className="page-center">
            <header className="header">
              <div className="navbar">
                <div className="logo">
                  <img className="rounded" src={logo} alt="Logo" />
                </div>
                <Link className="login-link" to="/login">Login</Link>
                <Link className="register-link" to="/signup">Sign Up</Link>
              </div>
              <div className="header_body">
                <div className="bodyText">
                  <div className="bodyText-content" id="heroHead">
                    Welcome to the <span>Golden</span> Arches Where Every Bite is a <span>Smile!</span>
                  </div>
                </div>
                <div className="bodyImg">
                  <img src="dish2.jpeg" alt="Burger Image" />
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Text Slider Contain */}
        <div className="text-slider-container">
          <div className="text-slide-contain flex">
            <div className="text-slide-head text-yellow-500">
            Find Your Inspiration <img src={upRightArrowBlack} alt="Star Png Icon" />
            </div>
            <div className="text-slide-head text-yellow-500">
              Cook with Confidence <img src={upRightArrowBlack} alt="Star Png Icon" />
            </div>
            <div className="text-slide-head text-yellow-500">
              Explore New Flavors <img src={upRightArrowBlack} alt="Star Png Icon" />
            </div>
            <div className="text-slide-head text-yellow-500">
              Share Your Creations <img src={upRightArrowBlack} alt="Star Png Icon" />
            </div>
          </div>
        </div>

        {/* Featured Item Section */}
        <div className="featured-item-section-main cntnt-section">
          <img src={frame7} alt="Sketch Burger" className="abs-img abs-img-right" />
          <div className="page-center">
            <div className="feature-item-sec">
              <div className="section-head feature-item-head">
                <div className="item-head">Featured</div>
                <div className="item-span-head">
                  Recipes
                </div>
                <div className="line"></div>
                <div className="head-des">Explore our handpicked collection of delicious recipes.</div>
              </div>

              <div className="featured-itemCard-sec">
                <div className="item-card-contain">
                  <img src={arrowElemImg} alt="Arrow Element Image" className="abs-img" />
                  <div className="item-card-contain item-contain-mt-30 item-card-contain2">
                    <div className="hghlt-text-contain">
                      <img src="hat.jpg" alt="Tomato Image" className="abs-img" />

                      <div className="hghlt-text">Explore More</div>
                      <div className="hghlt-text grdnt-text">Recipes</div>
                      <div className="more-option-cntnt">
                        <div className="hghlt-text">Now!</div>
                        <div className="option-btn">
                          <Link to="/login">
                            <img src={upRightArrowBlack} alt="up Right Arrow" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="featured-card featured-card4">
                      <div className="featured-card-img">
                        <img src={frame9} alt="Feature Card Image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Deal Section */}
        <div className="exclusive-deal-section-main cntnt-section">
          <img src={arrowElemImg} alt="Sketch Tomato" className="abs-img abs-img-left" />
          <div className="page-center">
            <div className="exclusive-deal-contain">
              <div className="section-head deal-sec-head">
                <div className="item-head py-2">Recipe</div>
                <div className="item-span-head">
                  <img src="hat.jpg" alt="Deal Section Heading Image" className="left-img" />
                  Of the Week
                  <img src="fork.jpg" alt="Deal Section Heading Image" className="right-img" />
                </div>
                <div className="line"></div>
                <div className="head-des">Don't miss out on our featured recipe this week!</div>
              </div>

              <div className="deal-cntnt-contain">
                <div className="deal-cntnt">
                  <div className="deal-cntnt-head">Spicy Thai Curry</div>
                  <div className="deal-cntnt-des">A flavorful and aromatic curry with coconut milk, vegetables, and your choice of protein.</div>
                </div>
                <div className="deal-sec-img">
                  <img src="spicy.jpg" alt="Deal Section Image" />
                </div>
                <div className="deal-btn cntnt-btn">
                  View Recipe
                  <div className="icon">
                    <Link to="/login">
                      <img src={upRightArrowBlack} alt="up Right Arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Inside Section */}
        <div className="what-inside-sec-main cntnt-section">
          <div className="page-center">
            <div className="what-inside-cntnt-contain">
              <div className="what-inside-img-contain">
                <img src={IndianChefBgImg} alt="Burger With Layers Image" className="what-inside-main-img" />
                {/* Layer Arrow Images */}
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className={`layer-arrow-abs-img layer-arrow${num}`}>
                    <img src={whatInsideSecArrow1} alt="Arrow Image" />
                  </div>
                ))}
              </div>
              
              {/* Layer Content Sections */}
              {[
                {type: 'bun', title: 'Biryani', description: 'Flour, Sugar, Yeast and Butter, Egg.', position: 'right'},
                {type: 'onion', title: 'Soup', description: 'Zesty and finely chopped', position: 'right'},
                {type: 'cheese', title: 'Chicken', description: 'Melted to creamy perfection', position: 'right'},
                {type: 'lettuce', title: 'Butter Chicken', description: 'Fresh and crispy for that perfect crunch', position: 'left'},
                {type: 'tomato', title: 'Channa Masala', description: 'Juicy slices for a burst of freshness', position: 'left'},
                {type: 'beef', title: 'Vada Pav', description: 'Juicy, flavorful, and cooked to order', position: 'left'}
              ].map((layer) => (
                <div key={layer.type} className={`layer-abs-elem layer-${layer.type}-cntnt layer-${layer.position}-cntnt`}>
                  <div className="layer-abs-cntnt">
                    <div className="layer-head-cntnt">{layer.title}</div>
                    <div className="layer-des-cntnt">{layer.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text Moving Section */}
        <div className="text-moving-container">
      <div className="text-moving-cntnt-container">
        <div className="text-moving-cntnt-grp top-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">Find Your</div>
            <div className="text-moving-img">
              <img src="fork.jpg" alt="Find Recipe Now logo" />
            </div>
            <div className="text-moving-txt">Recipe Now</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">Find Your</div>
            <div className="text-moving-img">
              <img src="star.jpg" alt="Find Recipe Now logo" />
            </div>
            <div className="text-moving-txt">Recipe Now</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
        </div>
        <div className="text-moving-cntnt-grp top-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">Find Your</div>
            <div className="text-moving-img">
              <img src="hat.jpg" alt="Find Recipe Now logo" />
            </div>
            <div className="text-moving-txt">Recipe Now</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">Find Your</div>
            <div className="text-moving-img">
              <img src="fork.jpg" alt="Find Recipe Now logo" />
            </div>
            <div className="text-moving-txt">Recipe Now</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-moving-cntnt-container">
        <div className="text-moving-cntnt-grp middle-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="hat-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="fork-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
        </div>
        <div className="text-moving-cntnt-grp middle-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="star-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="hat-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
        </div>
        <div className="text-moving-cntnt-grp middle-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="star-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">Cook With</div>
            <div className="text-moving-img">
              <img src="hat-red.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Great Joy</div>
            <div className="text-moving-img">
              <img src="logo 1.png" alt="Design Element" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-moving-cntnt-container">
        <div className="text-moving-cntnt-grp bottom-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="hat-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="star-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
        </div>
        <div className="text-moving-cntnt-grp bottom-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="fork-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="star-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
        </div>
        <div className="text-moving-cntnt-grp bottom-cntnt-grp">
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="hat-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
          <div className="text-moving-item">
            <div className="text-moving-txt">A Side Of</div>
            <div className="text-moving-img">
              <img src="fork-y.jpg" alt="Design Element" />
            </div>
            <div className="text-moving-txt">Pure Bliss</div>
            <div className="text-moving-img">
              <img src={logo} alt="Design Element" />
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Footer Section */}
        <footer>
          <div className="footer-cntnt-contain">
            <div className="page-center">
              <div className="footer-head-contain">
                <div className="footer-head">Tastssee Treasure</div>
              </div>
              <div className="footer-bottom-link-contain">
                <div className="footer-bottom-text">© 2017 - 2024 Tastssee Treasure. All Rights Reserved</div>
                <div className="footer-bottom-link">
                  <Link className="bottom-link footerLink" to="/login">Login</Link>
                  <Link className="bottom-link footerLink" to="/signup">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage; // Ensure this is a default export