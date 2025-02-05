import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/footer";
import { AddMenu as AddMenuForm } from "../components/AddMenu/add-menu";
import "../styles/global.css";

export const AddMenu = () => {
    return (
      <body>
        <Navbar />
        <AddMenuForm />
        <Footer />
      </body>
    );
};