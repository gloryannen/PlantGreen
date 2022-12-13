import { React, useContext } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import Home from "./Home";
import Profile from "./user/Profile";
import SignUpForm from "./user/SignUp";
import LoginForm from "./user/Login";
import PlantsMain from "./plants/PlantsMain";
import PlantList from "./plants/PlantList";

import { UserContext } from "./hooks/UserContext";

function PrivateRoutes() {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function Routing({ login, signup }) {
  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route exact path="profile" element={<Profile />}></Route>
        <Route exact path="plants" element={<PlantsMain />}></Route>
        <Route exact path="plants_saved" element={<PlantList />}></Route>
      </Route>
      {/* End of Private Routes */}
      <Route
        exact
        path="signup"
        element={<SignUpForm signup={signup} />}
      ></Route>
      <Route exact path="login" element={<LoginForm login={login} />}></Route>
      {/* End of General Routes */}
      {/* General Routes */}
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default Routing;
