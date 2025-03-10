import { supabase } from "./supabase";

export async function getOrder() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error(error);
    throw new Error("orderss could not be loaded");
  }

  return data;
}

export async function createOrder(newOrder) {
  console.log("Sending order to Supabase:", newOrder);

  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    console.error("Supabase Insert Error:", error.message);
    throw new Error(`Failed to create order in Supabase: ${error.message}`);
  }

  console.log(" Order Successfully Stored in Supabase:", data);
  return data;
}

export async function updateOrder(id, updateObj) {
  const { data, error } = await supabase
    .from("orders")
    .insert(updateObj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to update order");
  }
  return data;
}
