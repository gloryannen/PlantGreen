import { useEffect, useState } from "react";
import "./App.css";
import PlantGreenApi from "./Api";
import Routing from "./Routes";
import NavBar from "./NavBar";
import LoadingSpinner from "./LoadingSpinner";
import useLocalStorage from "./hooks/UseLocalStorage";
import { UserContext } from "./hooks/UserContext";
import { decodeToken } from "react-jwt";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getUser() {
        if (token !== null) {
          try {
            let username = decodeToken(token).username;
            PlantGreenApi.token = token;
            let currentUser = await PlantGreenApi.getUser(username);
            setCurrentUser(currentUser);
          } catch (errors) {
            console.error("App loadUserInfo: problem loading", errors);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getUser();
    },
    [token]
  );

  async function signup(newUser) {
    try {
      await PlantGreenApi.registerUser(newUser);
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

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  async function getPlantData(plantFiles) {
    try {
      let plantData = await PlantGreenApi.getPlantData(plantFiles);
      return plantData;
    } catch (errors) {
      return console.log("ERRORS -> ", errors);
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

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
