import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

/**
 * The service uses Axios for HTTP requests 
 * and Local Storage for user information & JWT.
 */
class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => { 
        if (response.data.accessToken) { 
          // this is the insecure part: access token is stored in localStorage
          // together with username and roles...
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();