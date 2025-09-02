import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend address
});

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/predict/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadVideo = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/predict/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export default API;
