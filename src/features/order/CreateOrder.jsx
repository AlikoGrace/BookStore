import React from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiOrders";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  { book_id: "1", title: "Atomic Habits", quantity: 2, price: 12.99 },
  { book_id: "2", title: "Clean Code", quantity: 1, price: 35.5 },
];

const CreateOrder = () => {
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const totalPrice = fakeCart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <div>
      <h2>Ready to order??</h2>
      <Form method="POST">
        <div>
          <label> Name</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>phone Number</label>

          <input type="tel" name="contact" required />

          {formErrors?.contact && <p>{formErrors.contact}</p>}
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" required />
        </div>
        <div>
          <input type="checkbox" name="priorityOrder" id="priorityOrder" />
          <label>priority order(extra charge)</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(fakeCart)} />
        <input type="hidden" name="totalPrice" value={totalPrice} />

        <button disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "order now"}
        </button>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  try {
    console.log("Action function triggered");

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priorityOrder: data.priorityOrder === "on",
    };

    console.log("Order Data Before Submission:", order);

    const errors = {};
    if (!isValidPhone(order.contact))
      errors.contact = "Please give us a correct phone number to contact you";
    if (Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    console.log("✅ Order Successfully Stored:", newOrder);

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error(" Error storing order:", error);
    throw error;
  }
}

export default CreateOrder;
