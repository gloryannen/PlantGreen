import axios from "axios";
// import PlantIdKey from "./API_KEYS";

// const BASE_API_URL = "https://api.plant.id/v2/identify";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PlantGreenApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PlantGreenApi.token}` };
    const params = method === "get" ? data : {};
    console.log(url, method, data, params, headers);
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async registerUser(newUser) {
    const res = await this.request("auth/register", newUser, "post");
    if (res.success) {
      PlantGreenApi.token = res;
      return res.token;
    } else {
      return res;
    }
  }

  static async login(user) {
    const res = await this.request("auth/token", user, "post");
    try {
      PlantGreenApi.token = res.token;
      return res.token;
    } catch (errors) {
      return res.errors;
    }
  }

  static async getUser(username) {
    try {
      const res = await this.request(`users/${username}`, {
        username: username,
      });
      return res.user;
    } catch {
      return null;
    }
  }

  static async editUser(username, user) {
    try {
      const res = await this.request(`users/${username}`, user, "patch");
      return res.user;
    } catch (error) {
      return null;
    }
  }

  static async getPlantData(plantFiles) {
    try {
      const res = await this.request(
        "api/plantdata",
        { plantFiles: plantFiles },
        "post"
      );
      console.log("RES from ApiJS---------->", res);
      return res;
    } catch (errors) {
      console.log(errors);
    }
  }
}

export default PlantGreenApi;
