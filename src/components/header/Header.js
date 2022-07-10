import React from "react";
import "./Header.css";
import pic from "../../images/Shubham_ECE_Photo.jpeg";

const Header = () => {
  return (
    <div className="sticky-bar">
      <div className="header-text big">
        Indian Premiere League Statistics & Charts
      </div>
      <div className="right-bar">
        <div className="login-section-container">
          <div className="profile-pic-container">
            <img src={pic} alt="Profile Pic" />
          </div>
          <div className="username header-text">User</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
