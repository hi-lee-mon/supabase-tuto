import { getItemById } from '@/app/action/item';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { itemId },
}: {
  params: {
    itemId: string;
  };
}) {
  const item = await getItemById(itemId);

  if (!item) {
    return notFound();
  }

  return (
    <div className="p-6">
      <Button asChild size="icon">
        <Link href={`/item/${itemId}/edit`}>
          <Pencil size={20} />
          <span className="sr-only">アイテムを編集</span>
        </Link>
      </Button>
      <h1 className="font-bold text-2xl mb-6">{item.name}</h1>
      <p className="text-muted-foreground mt-2">{item.amount.toLocaleString()}</p>
    </div>
  );
}
