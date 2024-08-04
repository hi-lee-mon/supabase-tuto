import 'server only';
('use server');
import { createClient } from '@/lib/supabase/server';

export const updateProfile = async (formData: FormData) => {
  const image = formData.get('avatar') as File;
  const supabase = createClient();
  const { error } = await supabase.storage.from('avatars').upload(image.name, image);
  if (error) {
    throw new Error(error.message, { cause: error });
  }

  const { data } = await supabase.storage.from('avatars').getPublicUrl(image.name);

  return data.publicUrl;
};
