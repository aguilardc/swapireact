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

// eslint-disable-next-line import/no-anonymous-default-export
export default new FilmsDataService();