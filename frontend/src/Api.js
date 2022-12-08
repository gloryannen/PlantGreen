const axios = require("axios");

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PlantGreenApi {
  // Token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // Pass authorization token in the header.

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PlantGreenApi.token}` };
    const params = method === "get" ? data : {};
    // console.log(url, method, data, params, headers);
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async registerUser(newUser) {
    const res = await this.request("api/auth/register", newUser, "post");
    return res;
  }

  static async login(user) {
    const res = await this.request("api/auth/token", user, "post");
    try {
      return res.token;
    } catch (errors) {
      return res.errors;
    }
  }

  static async getUser(username) {
    try {
      const res = await this.request(`api/users/${username}`, {
        username: username,
      });
      return res.user;
    } catch {
      return null;
    }
  }

  static async editUser(username, user) {
    try {
      const res = await this.request(`api/users/${username}`, user, "patch");
      return res.user;
    } catch (error) {
      return null;
    }
  }

  static async getPlantData(plantFiles) {
    try {
      const res = await this.request(
        "api/plantId/plantdata",
        { plantFiles: plantFiles },
        "post"
      );
      return res;
    } catch (errors) {
      console.log(errors);
    }
  }
}

export default PlantGreenApi;
