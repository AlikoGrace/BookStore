import { supabase } from "./supabase";

export async function getOrders() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error(error);
    throw new Error("orderss could not be loaded");
  }

  return data;
}
