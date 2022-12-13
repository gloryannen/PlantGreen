import { useState, useContext } from "react";

import { UserContext } from "../hooks/UserContext";
import PlantGreen from "../Api";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await PlantGreen.editUser(username, user);
    } catch (errors) {
      console.log(errors);
    }

    setCurrentUser(updatedUser);
  }

  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center w-100">
      <div className="formContainer col-12 border rounded">
        <form>
          <div className="mb-3">
            <label className="col-4 form-label fs-3">
              <strong>{formData.username}</strong>
            </label>
          </div>

          <div className="mb-3">
            <label className="col-4 form-label fs-3">
              Email
              <input
                className="form-control"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </label>
          </div>

          <div className="mb-3">
            <label className="col-4 form-label fs-3">
              Password
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </label>
          </div>

          <input
            className="col-4 btn btn-success fs-3"
            type="submit"
            value="Save"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
