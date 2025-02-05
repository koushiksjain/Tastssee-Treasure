import React from "react";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import { Home } from "../components/Home/Home.jsx";
import { Footer } from "../components/Footer/footer.jsx";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};
export default HomePage;