import http from "../http-common";

class QueryDataService {
    getAll() {
        return http.get("/Inventory");
      }
}

export default new QueryDataService();