import { Button } from "@/components/ui/button";
import { currentUser } from "@/services/data/auth";
import { redirect } from 'next/navigation'
import Link from "next/link";

export default async function Home() {
  // サーバー側で実行されるので、ログインしていないときはリダイレクトされる
  const user = await currentUser();
  if(!user) {
    redirect("/login");
  }

  return (
    <main className="">
      <h1>Home画面</h1>
      <Button asChild variant={"outline"}>
        <Link href="/login">Login</Link>
      </Button>
    </main>
  );
}
