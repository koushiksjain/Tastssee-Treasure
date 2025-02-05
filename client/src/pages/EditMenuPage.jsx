import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/footer";
import { EditRecipes } from "../components/EditRecipes/edit-recipes";
import "../styles/global.css";

export const EditMenuPage = () => {
    return (
      <>
        <Navbar />
        <EditRecipes />
        <Footer />
      </>
    );
};