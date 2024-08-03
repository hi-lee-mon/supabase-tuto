'use server';
import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@/services/data/auth";

export const createItem = async (formData: {
  name:string,
  amount:number,
}) => {
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

export const getItems = async () => {
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