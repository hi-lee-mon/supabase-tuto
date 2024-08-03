import { Button } from "@/components/ui/button";
import { signOut } from "@/services/action/auth";
import { currentUser } from "@/services/data/auth";
import Link from "next/link";
import { redirect } from 'next/navigation';
import ItemForm from "./item-form";
import { getItems } from "./action/item";
import { Input } from "@/components/ui/input";

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
      <form action={
        async (data: FormData)=>{
          "use server";
          const query = data.get("query") as string

          redirect(`/search?q=${query}`)
        }
      } className="flex gap-2">
        <Input name="query" type="text" autoComplete="off" className="flex-1"/>
        <Button>検索</Button>
      </form>
      <div className="grid grid-cols-2 gap-6">
        {
          items.map((item)=>{
            return (
              <div key={item.id} className="relative border p-2 rounded-lg">
                <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
                <Link href={`/item/${item.id}`}>
                {item.name}/{item.amount.toLocaleString()}円
                <span className="absolute inset-0"/>
                </Link>
              </div>
            )
          })
        }
      </div>
    </main>
  );
}
