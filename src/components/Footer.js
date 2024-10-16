// Footer.js
import React from "react";
import "./Footer.css"; // Optional: Import a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} Pickleball. All Rights Reserved.
        </p>
        <p>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>{" "}
          |
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
