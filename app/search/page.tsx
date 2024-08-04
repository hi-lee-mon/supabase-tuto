import Link from 'next/link';
import { searchItems } from '../action/item';

export default async function Page({ searchParams }: { searchParams: { q: string } }) {
  const items = await searchItems(searchParams.q);

  if (!items) {
    return <div>該当する検索結果がありませんでした。</div>;
  }
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">{searchParams.q}の検索結果</h1>
      <div className="grid grid-cols-2 gap-6">
        {items.map((item) => {
          return (
            <div key={item.id} className="relative border p-2 rounded-lg">
              <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
              <Link href={`/item/${item.id}`}>
                {item.name}/{item.amount.toLocaleString()}円
                <span className="absolute inset-0" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
