import { orderDetails } from "./order-detail";
import { paymentDetails } from "./payment-details";

export interface salesOrder{
    orderDetails: orderDetails[],
    paymentDetails: paymentDetails
}