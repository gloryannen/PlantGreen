import { useState } from "react";
import PlantGreenApi from "../Api";
import PlantList from "./PlantList";
import "./plantmain.css";

const PlantsMain = () => {
  const [isLoading, setLoading] = useState(false);
  let [plants, setPlants] = useState(null);
  async function handleChange(e) {
    // Store the file
    let plantFiles = e.target.files[0];
    await handleFileUpload(plantFiles);
  }

  async function handleFileUpload(plantFiles) {
    // Turn file into base64; plant.id api requires base64 for images
    setLoading(true);
    const toBase64 = (plantFiles) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(plantFiles);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const base64file = await toBase64(plantFiles);

    // Send base64 files to server and wait for response
    const plantsRes = await PlantGreenApi.getPlantData(base64file);
    const plantList = plantsRes.data;
    setPlants({ plantList });
    setLoading(false);
  }

  return (
    <>
      <div className="formWrapper">
        <form id="uploadForm" method="POST">
          <div className="input-group mb-3 my-3">
            <input
              className="form-control-file btn btn-success py-3 "
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <PlantList plants={plants} />
      <>
        {isLoading ? (
          <div className="spinner-border warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </>
    </>
  );
};
export default PlantsMain;
