import http from "../http-common";

class FilmsDataService {
  getAll() {
    return http.get("/films");
  }

  get(id) {
    return http.get(`/films/${id}`);
  }

  getCharacter(path) {
    return http.get(path);
  }
}

export default new FilmsDataService();