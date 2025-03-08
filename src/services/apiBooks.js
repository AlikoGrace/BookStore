import { supabase } from "./supabase";

export async function getBooks() {
  let { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error(error);
    throw new Error("Books could not be loaded");
  }

  return data;
}
