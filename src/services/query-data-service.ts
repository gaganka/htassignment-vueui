import http from "../http-common";

class QueryDataService {
    getAll() {
        return http.get("api/Inventory");
      }
}

export default new QueryDataService();