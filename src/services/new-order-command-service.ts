import { salesOrder } from "@/models/sales-order";
import http from "../http-common";

class NewOrderCommandService {

    newOrder(model: salesOrder) {
        return http.post("Order/New", model);
      }
}

export default new NewOrderCommandService();