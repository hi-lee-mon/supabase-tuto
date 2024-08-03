"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { createItem } from "./action/item"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const ItemFormSchema = z.object({
  amount: z.coerce.number().min(1).max(99999),
  name: z.string().min(1).max(100),
})

type ItemFormData = z.infer<typeof ItemFormSchema>;

export default function ItemForm() {
  const form = useForm<ItemFormData>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      amount: 0,
      name: "",
    },
  })

  const {toast} = useToast()

  const onSubmit:SubmitHandler<ItemFormData> = async(data) => {
    try {
      await createItem(data);
        toast({
          title: "追加完了",
          description: "テーブルを確認してください",
        })
        form.reset();
    } catch (error) {
        toast({
          title: "追加失敗",
          description: "問い合わせしてください",
          variant: "destructive",
        })
    }

  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit,()=>alert("フォームの値が不正です"))} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>商品名</FormLabel>
              <FormControl>
                <Input placeholder="あんぱん" {...field} />
              </FormControl>
              <FormDescription>
                最大で100文字まで
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>値段</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                0円以上
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>追加しています</> : "商品追加"}
        </Button>
      </form>
    </Form>
  )
}