import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    headers: {
    'Content-Type': 'application/json',
  },
});

class BaseService {
  constructor(resource) {
    this.resource = resource;
  }

  getAll(params = {}) {
    return apiClient.get(this.resource, { params });
  }

  get(id) {
    return apiClient.get(`${this.resource}/${id}`);
  }

  create(data) {
    return apiClient.post(this.resource, data);
  }

  update(id, data) {
    return apiClient.put(`${this.resource}/${id}`, data);
  }

  delete(id) {
    return apiClient.delete(`${this.resource}/${id}`);
  }
}

export default BaseService;
