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
    } catch (error) {
      console.log(error);
    }

    setCurrentUser(updatedUser);
  }

  return (
    <div className="mt-5">
      <form>
        <div className="mb-3">
          <label className="form-label">
            Username: <b>{formData.username}</b>
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email:
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
          <label className="form-label">
            Password:
            <input
              className="form-control"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </label>
        </div>

        <input
          className="btn btn-primary"
          type="submit"
          value="Save"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Profile;
