import { Button } from "@/components/ui/button";
import { signOut } from "@/services/action/auth";
import { currentUser } from "@/services/data/auth";
import Link from "next/link";
import { redirect } from 'next/navigation';
import ItemForm from "./item-form";
import { getItems } from "./action/item";

export default async function Home() {
  // サーバー側で実行されるので、ログインしていないときはリダイレクトされる
  const user = await currentUser();
  if(!user) {
    redirect("/login");
  }

  const items = await getItems();

  return (
    <main className="flex flex-col p-4 gap-4">
      <h1>Home画面</h1>
      <div className="flex gap-2">
        <form action={signOut}>
          <Button>ログアウト</Button>
        </form>
        <Button asChild variant={"outline"}>
          <Link href="/login">
            ログイン画面へ遷移
          </Link>
        </Button>
      </div>
      <ItemForm/>
      <h2 className="text-2xl font-bold">商品一覧</h2>
      <div className="grid grid-cols-2 gap-2">
        {
          items.map((item)=>{
            return (
              <div key={item.id} className="border p-2 rounded-lg">
                <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
                {item.name}/{item.amount.toLocaleString()}
              </div>
            )
          })
        }
      </div>
    </main>
  );
}
