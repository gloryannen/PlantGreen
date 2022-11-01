import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./navbar.css";

import { UserContext } from "./hooks/UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="navbar">
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand mx-3">
          PlantGreen
        </NavLink>
        <Nav>
          {currentUser ? (
            <>
              <NavItem className="mx-2">
                <NavLink style={{ textDecoration: "none" }} to="/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/"
                  onClick={logout}
                >
                  <p className="text-danger">
                    <strong>Logout {currentUser.username}</strong>
                  </p>
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem className="mx-2">
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink style={{ textDecoration: "none" }} to="/signup">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
