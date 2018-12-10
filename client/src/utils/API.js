import axios from "axios";

export default {
  loginUser(email, password) {
    return axios.post("/auth/login", { email, password });
  },

  registerUser(email, password) {
    return axios.post("/auth/register", { email, password });
  },

  getAllDatasets(accessString) {
    return axios.get("/api/datasets/", {
      headers: { Authorization: `JWT ${accessString}` },
    });
  },

  getDataset(accessString, datasetId) {
    return axios.get(`/api/datasets/${datasetId}`, {
      headers: { Authorization: `JWT ${accessString}` },
    });
  },

  createDataset(accessString, newDataset) {
    return axios.post("/api/datasets/", newDataset, {
      headers: { Authorization: `JWT ${accessString}` },
    });
  },

  updateDataset(accessString, datasetId, updatedDataset) {
    return axios.put(`/api/datasets/${datasetId}`, updatedDataset, {
      headers: { Authorization: `JWT ${accessString}` },
    });
  },

  deleteDataset(accessString, datasetId) {
    return axios.delete(`/api/datasets/${datasetId}`, {
      headers: { Authorization: `JWT ${accessString}` },
    });
  },
};
