import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:61797/api",
  headers: {
    "Content-type": "application/json"
  }
});