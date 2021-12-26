import axios from "axios";

const instance = axios.create({
  baseURL: "https://clipboard-b.herokuapp.com",
});

export default instance;
