import { Button } from "@/components/ui/button";
import { signOut } from "@/services/action/auth";
import { currentUser } from "@/services/data/auth";
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function Home() {
  // サーバー側で実行されるので、ログインしていないときはリダイレクトされる
  const user = await currentUser();
  if(!user) {
    redirect("/login");
  }

  return (
    <main className="">
      <h1>Home画面</h1>
      <form action={signOut}>
        <Button>ログアウト</Button>
      </form>
      <Button asChild variant={"outline"}>
        <Link href="/login">
          ログイン画面へ遷移
        </Link>
      </Button>
    </main>
  );
}
