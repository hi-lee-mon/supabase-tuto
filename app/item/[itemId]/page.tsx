import { getItemById } from "@/app/action/item"
import { notFound } from "next/navigation";

export default async function Page({
  params:{itemId}
}:{
  params:{
    itemId:string
  }
}) {
  const item = await getItemById(itemId);

  if(!item){
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">{item.name}</h1>
      <p className="text-muted-foreground mt-2">{item.amount.toLocaleString()}</p>
    </div>
  )
}