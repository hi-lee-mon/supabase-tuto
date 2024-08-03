import { Button } from "@/components/ui/button";
import { signIn } from "@/services/action/auth";
import { currentUser } from "@/services/data/auth";

export default async function Page() {
  const user = await currentUser();


  return (
    <>
      <div>ログイン画面</div>
      {user && <p>{JSON.stringify(user)}</p>}
      <form action={signIn}>
        <Button>ログイン</Button>
      </form>
    </>
  )
}