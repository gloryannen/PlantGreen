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
    <div className="min-vh-100 justify-content-center align-items-center">
      <div>
        <h1 className="text-center">PlantGreen</h1>
        <p>Identify your plant!</p>
        {currentUser ? (
          <div>
            <h2>Welcome Back, {currentUser.username}!</h2>
            <form id="uploadForm">
              <div className="text-center">
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

            {/* CARD */}
            <div className="card-group my-5 text-dark bg-gradient-primary text-white col">
              {plantResponse.d ? (
                <>
                  {plantResponse.d.suggestions.map((item) => {
                    return (
                      <div className="row">
                        <div className="col">
                          <div
                            className="card w-75 border-warning bg-light mx-5 my-3"
                            style={{ minWidth: "100%" }}
                          >
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                Common Name: {item.plant_details.common_names}
                              </li>
                              <li className="list-group-item">
                                Scientific Name:
                                {item.plant_details.scientific_name}
                              </li>
                            </ul>
                            {item.similar_images.map((item) => {
                              return (
                                <div>
                                  <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                      Some quick example
                                    </p>
                                  </div>
                                  <img
                                    src={item.url}
                                    style={{ width: "300px" }}
                                    alt="plant"
                                    className="card-img-bottom"
                                  ></img>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="text-dark">Nothing to see here for data</p>
              )}
            </div>
            {/* END OF CARD */}
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
