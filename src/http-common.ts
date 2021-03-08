import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:61797/",
  headers: {
    "Content-type": "application/json"
  }
});