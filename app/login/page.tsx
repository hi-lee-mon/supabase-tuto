import { Button } from "@/components/ui/button";
import { signIn } from "@/services/action/auth";
import { currentUser } from "@/services/data/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if(user){
    redirect("/")
  }


  return (
    <>
    {user}
      <div>ログイン画面</div>
      <form action={signIn}>
        <Button>ログイン</Button>
      </form>
    </>
  )
}