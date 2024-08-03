'use server';
import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@/services/data/auth";
import { Tables, TablesInsert } from "@/types/types_db";

type Item = Tables<"items">;

export const createItem = async (formData: TablesInsert<"items">) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = await currentUser();
  if(!user){
    throw new Error("ログインしてください。");
  }
  const supabase = createClient();

  const {error} = await supabase.from("items").insert(formData);

  if(error){
    throw new Error(error.message, {cause:error});
  }
};

export const getItems = async (): Promise<Item[]> => {
  const supabase = createClient();
  const {data, error} = await supabase.from("items").select("*");
  if(error){
    throw new Error(error.message, {cause:error});
  }
  return data;
};

export const getItemById = async (id:string) => {
  const supabase = createClient();
  const {data, error} = await supabase.from("items").select("*").eq("id", id).single();
  if(error){
    throw new Error(error.message, {cause:error});
  }
  return data;
};

export const searchItems = async (query:string) => {
  const supabase = createClient();
  const {data, error} = await supabase.from("items").select("*").like("name", `%${query}%`);
  if(error){
    throw new Error(error.message, {cause:error});
  }
  return data;
};