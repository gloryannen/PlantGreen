import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ signup }) => {
  let navigate = useNavigate();
  let INITIAL_STATE = {
    username: "",
    email: "",
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
    let result = await signup(formData);
    if (result.success) {
      navigate("/login");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="col-12 mt-5">
      {formErrors.map((e) => (
        // Slice removes the word "instance."" from error message
        <h2 className="text-danger">{e.slice(9)}</h2>
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

export default SignUpForm;
