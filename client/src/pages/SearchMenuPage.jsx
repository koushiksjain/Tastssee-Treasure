import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/footer";
import { SearchMenu } from "../components/SearchMenu/search-menu";
import "../styles/global.css";

export const SearchMenuPage = () => {
    return (
      <>
        <Navbar />
        <SearchMenu />
        <Footer />
      </>
    );
};