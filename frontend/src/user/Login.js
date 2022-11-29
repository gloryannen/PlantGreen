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
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center w-100">
      <h2 className="display-3 my-5">Login</h2>
      <div className="formContainer col-12 border rounded">
        {formErrors.map((e, idx) => (
          <h2 className="text-danger" key={idx}>
            {e}
          </h2>
        ))}
        <form>
          <div className="mb-3">
            <label className="col-4 form-label fs-3">
              Username
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
            <label className="col-4 form-label fs-3">
              Password
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
              className="col-4 btn btn-success fs-3"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
