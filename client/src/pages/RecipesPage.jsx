import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/footer";
import RecipePage from "../components/Recipes/recipes";
import "../styles/global.css";

export const RecipesPage = () => {
    return (
      <>
        <Navbar />
        <RecipePage/>
        <Footer />
      </>
    );
};