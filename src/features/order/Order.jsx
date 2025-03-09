import React from "react";
import { getOrder } from "../../services/apiOrders";
import { useLoaderData } from "react-router-dom";

const Order = () => {
  const order = useLoaderData();
  const { id, name, contact, cart, totalPrice, priorityOrder, status } = order;
  return (
    <div>
      <div>
        <h2>status</h2>
        <div>
          <span>{status}</span>
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
