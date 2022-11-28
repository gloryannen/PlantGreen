import PlantCard from "./PlantCard";

const PlantList = ({ plants }) => {
  return (
    <>
      {plants != null ? (
        <div>
          <PlantCard plant={plants} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default PlantList;
