'use server';
import { createClient } from '@/lib/supabase/server';
import { currentUser } from '@/services/data/auth';
import { Tables, TablesInsert, TablesUpdate } from '@/types/types_db';

type Item = Tables<'items'>;

export const createItem = async (formData: TablesInsert<'items'>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = await currentUser();
  if (!user) {
    throw new Error('ログインしてください。');
  }
  const supabase = createClient();

  const { error } = await supabase.from('items').insert(formData);

  if (error) {
    throw new Error(error.message, { cause: error });
  }
};

export const getItems = async (): Promise<Item[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('items').select('*');
  if (error) {
    throw new Error(error.message, { cause: error });
  }
  return data;
};

export const getItemById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
  if (error) {
    throw new Error(error.message, { cause: error });
  }
  return data;
};

const OR = ' or ';
export const searchItems = async (keyword: string) => {
  // 半角(\s)もしくは全角(\u3000)があればorで分割する
  const newKeyword = keyword.replace(/[\u3000\s]+/g, OR);
  const supabase = createClient();
  let query = supabase.from('items').select('*');

  if (newKeyword.match(OR)) {
    const keywords = newKeyword.split(OR).map((keyword) => `%${keyword}%`);
    // いずれかの部分一致
    query = query.ilikeAnyOf('name', keywords);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message, { cause: error });
  }
  return data;
};

export const deleteItem = async (id: string) => {
  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    throw new Error('ログインしてください。');
  }
  const { error } = await supabase.from('items').delete().eq('id', id);
  if (error) {
    throw new Error(error.message, { cause: error });
  }
};

export const updateItem = async (id: string, formData: TablesUpdate<'items'>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    throw new Error('ログインしてください。');
  }
  const { error } = await supabase.from('items').update(formData).eq('id', id);
  if (error) {
    throw new Error(error.message, { cause: error });
  }
};
