import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/footer";
import { Profile } from "../components/Profile/profile";
import "../styles/global.css";

export const ProfilePage = () => {
    return (
      <>
        <Navbar />
        <Profile />
        <Footer />
      </>
    );
};