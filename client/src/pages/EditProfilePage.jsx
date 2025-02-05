import React from "react";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import { EditProfile } from "../components/EditProfile/edit-profile.jsx";
import { Footer } from "../components/Footer/footer.jsx";

export const EditProfilePage = () => {
  return (
    <>
      <Navbar />
      <EditProfile />
      <Footer />
    </>
  );
};
