import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "../action/profile"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <form action={updateProfile}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="avatar">Picture</Label>
        <Input name="avatar" id="avatar" type="file" />
        <Button>アップロード</Button>
      </div>
    </form>
  )
}