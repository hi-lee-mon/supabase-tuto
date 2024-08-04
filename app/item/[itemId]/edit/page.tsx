import { getItemById } from '@/app/action/item';
import ItemForm from '@/app/item-form';
import { redirect } from 'next/navigation';

export default async function Page({
  params: { itemId },
}: {
  params: {
    itemId: string;
  };
}) {
  const item = await getItemById(itemId);

  if (!item) {
    redirect('/');
  }

  return (
    <div>
      <p>編集画面</p>
      <ItemForm isUpdateMode defaultValues={item} id={itemId} />
    </div>
  );
}
