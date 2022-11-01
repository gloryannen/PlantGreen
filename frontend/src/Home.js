import { useContext } from "react";
import { UserContext } from "./hooks/UserContext";
import { Link } from "react-router-dom";
import "./plantFileUpload";
import { useState } from "react";

const Home = ({ getPlantData }) => {
  const [loading, setIsLoading] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [plantResponse, setPlantResponse] = useState({});

  // Turn uploaded files into base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function handleChange(event) {
    let plantFiles = event.target.files;

    if (plantFiles.length > 0) {
      setIsLoading(true);

      let base64file = await toBase64(plantFiles[0]);
      let plantData = await getPlantData(base64file);
      const d = plantData.data;
      console.log("D.data -------->", d);

      setPlantResponse({ d });
      setIsLoading(false);
      console.log("PLANT RES", JSON.stringify(plantResponse));
    }
  }

  let { currentUser } = useContext(UserContext);
  return (
    <div className="row min-vh-100 justify-content-center align-items-center">
      <div className="col-12">
        <h1 className="text-center">PlantGreen</h1>
        <p>Identify your plant!</p>
        {currentUser ? (
          <div>
            <h2>Welcome Back, {currentUser.username}!</h2>
            <form id="uploadForm">
              <div className="text-center ng-tns-c72-2">
                {!loading ? (
                  <label htmlFor="fileUpload" className="btn btn-success mx-2">
                    <input
                      className="form-control-file"
                      id="fileUpload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </label>
                ) : (
                  <p>Loading~</p>
                )}
              </div>
            </form>
            <div>
              {plantResponse.d ? (
                <div>
                  <p>{plantResponse.d.id}</p>
                  {plantResponse.d.suggestions.map((item) => {
                    return (
                      <div>
                        <p>
                          {item.id} - {item.plant_name}
                        </p>
                        {item.similar_images.map((item) => {
                          return (
                            <li>
                              <img src={item.url} alt="plant"></img>
                            </li>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Nothing to see here for data</p>
              )}
            </div>
          </div>
        ) : (
          <p>
            <Link className="btn btn-primary mx-2" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary mx-2" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
