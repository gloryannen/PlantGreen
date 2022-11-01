import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  let INITIAL_STATE = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    console.log("RESULT", result);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="col-12 mt-5">
      {formErrors.map((e) => (
        <h2 className="text-danger">{e}</h2>
      ))}
      <form>
        <div className="mb-3">
          <label className="col-4 form-label">
            Username:
            <input
              className="form-control"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>
          </label>
        </div>

        <div className="mb-3">
          <label className="col-4 form-label">
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

        <div className="mb-3">
          <input
            className="col-4 btn btn-primary"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
