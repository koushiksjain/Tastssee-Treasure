import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import styles from "../Signup/styles.module.css";
import axios from "axios";

export const EditProfile = () => {
  /////////////////////////////////////

  const [user_id, setUser_id] = useState("");
  const [oldUserData, setOldUserData] = useState({});
  const [oldPhoto, setOldPhoto] = useState({});
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
          setOldUserData(data);
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
      const fetchProfilePhoto = async () => {
        console.log("hit");

        try {
          console.log(user_id);
          // Call the unlike API
          const response = await axios.get(
            "http://localhost:8080/api/update_photo",
            {
              params: {
                user_id: user_id,
              },
            }
          );
          setOldPhoto(response.data.imageUrl);
          console.log(response.data);
        } catch (error) {
          console.error("Error in deleting recipe:", error);
          alert("An error occurred while deleting the recipe.");
        }
      };
      fetchProfilePhoto();
    }
  }, [user_id]);

  const [newdata, setNewdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    user_id: "",
  });

  const [profile_photo, setProfile_photo] = useState({
    user_id: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_photo") {
      const file = files[0];
      console.log(file);
      if (file) {
        setProfile_photo({
          user_id: user_id,
          photo: file,
        });

        // Generate image preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(file);
      }
    } else {
      console.log("hit", oldUserData[name]);
      setNewdata((prev) => {
        return {
          ...prev,
          firstName: newdata.firstName
            ? newdata.firstName
            : oldUserData.firstName,
          lastName: newdata.lastName ? newdata.lastName : oldUserData.lastName,
          email: newdata.email ? newdata.email : oldUserData.email,
          [name]: value,
          user_id: user_id,
        };
      });
    }
  };
  console.log("new u data", newdata);
  console.log("new p data", profile_photo);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Profile Photo State:", profile_photo);
    console.log("New Data State:", newdata);

    try {
      if (profile_photo.photo) {
        console.log(profile_photo.photo);

        const formData = new FormData();
        formData.append("photo", profile_photo.photo);
        formData.append("user_id", profile_photo.user_id);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        await axios.post("http://localhost:8080/api/update_photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Added successfully!");
        setPreview(null);

        await axios.post("http://localhost:8080/api/update_user", newdata);

        localStorage.removeItem("token");
        window.location.reload();
        navigate("/login");
      } else {
        await axios.post("http://localhost:8080/api/update_user", newdata);

        localStorage.removeItem("token");
        window.location.reload();
        navigate("/login");
      }

      // console.log(message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  const handledeleteuser = async (e) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmRemove) {
      if (oldPhoto) {
        try {
          console.log("hit");

          await axios.post(
            "http://localhost:8080/api/update_photo/delete_photo/",
            {
              user_id,
            }
          );

          await axios.post(
            "http://localhost:8080/api/update_user/delete_user/",
            {
              user_id: user_id,
            }
          );

          localStorage.removeItem("token");
          window.location.reload();
          navigate("/login");
        } catch (err) {
          console.error("Error in deleting", err);
          setError("Failed to delete user");
        }
      } else {
        try {
          console.log("hit");

          await axios.post(
            "http://localhost:8080/api/update_user/delete_user/",
            {
              user_id: user_id,
            }
          );

          localStorage.removeItem("token");
          window.location.reload();
          navigate("/login");
        } catch (err) {
          console.error("Error in deleting", err);
          setError("Failed to delete user");
        }
      }
    } else {
      e.preventDefault();
    }
  };

  /////////////////////////////////////
  return (
    <div style={{ backgroundImage: "url('/pattern-bg.png')", height: "75vh" }}>
      <div
        className="max-w-5xl mx-auto bg-white px-8 rounded-xl shadow-md"
        style={{ top: "15%", position: "sticky" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Profile Image Section */}
            <div
              style={{ top: "10px", left: "20px" }}
              className="h-fit relative lg:w-1/3 flex flex-col items-center lg:items-start "
            >
              <h2
              style={{ top: "20px", left: "20px" }}
              className="text-2xl w-fit font-semibold text-yellow-500 relative"
            >
              Edit User Profile{" "}
              <span className="text-blue-500 cursor-pointer">Preview</span>
            </h2>
              <div className="rounded-xl overflow-hidden mb-10 relative">
                <div className="relative p-4">
                  <div className="bg-white rounded-full p-2 inline-block">
                    {preview ? (
                      <img
                        className="rounded-full w-40"
                        src={preview}
                        alt="Preview"
                      />
                    ) : (
                      <img
                        style={{ width: "190px" }}
                        className="rounded-full"
                        src={
                          oldPhoto
                            ? `http://localhost:8080/Profile_uploads/${oldPhoto}`
                            : "https://placehold.co/100x100"
                        }
                        alt="Placeholder image for user profile picture."
                      />
                    )}
                    {console.log(oldPhoto)}
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1 text-yellow-500"
                      style={{ fontSize: "30px" }}
                    >
                      Your Photo
                    </h3>
                    <p className="text-gray-600 text mb-4">
                      This will be displayed on your profile
                    </p>
                    <input
                      type="file"
                      id="upload"
                      name="profile_photo"
                      className="hidden"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="upload"
                      className="text-white bg-yellow-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 cursor-pointer"
                    >
                      Upload New
                    </label>
                    <Link to="/profile">
                      <button className="text-white bg-blue-500 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Go back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="lg:w-2/3">
              <h3 className="font-semibold mb-8 mt-8 text-3xl text-blue-500">
                Personal Information
              </h3>
              <div className="flex gap-4">
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-yellow-500 sm:text-sm">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={handleChange}
                      defaultValue={oldUserData.firstName}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-yellow-500 sm:text-sm">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={handleChange}
                      defaultValue={oldUserData.lastName}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-yellow-500 sm:text-sm">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    defaultValue={oldUserData.email}
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-yellow-500 sm:text-sm">
                      <i class="fa-solid fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              {error && <div className={styles.error_msg}>{error}</div>}
              <button
                className="mt-6 text-white bg-yellow-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                type="submit"
              >
                Save
              </button>
              <button
                className="mt-6 text-white bg-red-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ml-40"
                onClick={handledeleteuser}
              >
                Delete Your Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
