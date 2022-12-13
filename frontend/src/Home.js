import { useContext } from "react";
import { UserContext } from "./hooks/UserContext";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  let { currentUser } = useContext(UserContext);

  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center w-100">
      <div id="homeContainer" className="border rounded">
        <h1 className="display-1 text-center my-5">🪴 PlantGreen 🪴</h1>
        <ul className="fs-2 my-5">
          Upload plant images to learn:
          <br />
          <p className="lead my-3 fs-4">
            Scientific Name
            <br />
            Taxonomy
            <br /> Propagation Methods
            <br /> Edible Parts
            <br /> Wiki Description
            <br /> and more!
          </p>
        </ul>
        {currentUser ? (
          <div>
            <h2>
              Welcome Back, <strong>{currentUser.username}</strong>!
            </h2>
            <Link className="btn btn-lg btn-success mt-3" to="/plants">
              Upload Plant
            </Link>
          </div>
        ) : (
          <div className="my-5">
            <Link className="btn btn-lg btn-success mx-2 my-1" to="/login">
              Log in
            </Link>
            <Link className="btn btn-lg btn-success mx-2 my-1" to="/signup">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
