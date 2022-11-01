import { useEffect, useState } from "react";
import "./App.css";
import PlantGreenApi from "./Api";
import Routing from "./Routes";
import NavBar from "./NavBar";
import { UserContext } from "./hooks/UserContext";
import useLocalStorage from "./hooks/UseLocalStorage";
import { decodeToken } from "react-jwt";

function App() {
  const [token, setToken] = useLocalStorage("token" || null);
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getUser() {
        if (token !== ("null" || null)) {
          let username = decodeToken(token).username;
          let currentUser = await PlantGreenApi.getUser(username);

          PlantGreenApi.token = token;
          setCurrentUser(currentUser);
        } else {
          setCurrentUser(null);
        }
      }
      getUser();
    },
    [token]
  );

  async function signup(newUser) {
    try {
      let token = await PlantGreenApi.registerUser(newUser);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function login(userData) {
    try {
      let token = await PlantGreenApi.login(userData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function getPlantData(plantFiles) {
    try {
      let plantData = await PlantGreenApi.getPlantData(plantFiles);
      return plantData;
    } catch (errors) {
      return console.log("ERRORS -> ", errors);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App container">
        <NavBar logout={logout} />
        <Routing login={login} signup={signup} getPlantData={getPlantData} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
