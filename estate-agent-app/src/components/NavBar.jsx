import React from "react";
import { Link } from "react-router-dom";

// Simple NavBar Component
const NavBar = () => {
  return (
    <nav style={{ padding: "15px", background: "#333", color: "#fff" }}>
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        Estate Agent App
      </Link>
    </nav>
  );
};

export default NavBar;
