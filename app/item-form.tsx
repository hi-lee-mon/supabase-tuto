'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createItem, deleteItem, updateItem } from './action/item';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const ItemFormSchema = z.object({
  amount: z.coerce.number().min(1).max(99999),
  name: z.string().min(1).max(100),
});

type ItemFormData = z.infer<typeof ItemFormSchema>;

type UpdateProps = {
  defaultValues: ItemFormData;
  isUpdateMode: true;
  id: string;
};

type CreateProps = {
  defaultValues?: undefined;
  isUpdateMode?: undefined;
  id?: undefined;
};

export default function ItemForm({ defaultValues, isUpdateMode, id }: UpdateProps | CreateProps) {
  const form = useForm<ItemFormData>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: isUpdateMode
      ? defaultValues
      : {
          amount: 0,
          name: '',
        },
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<ItemFormData> = async (data) => {
    if (isUpdateMode) {
      try {
        await updateItem(id, data);
        toast({
          title: '更新完了',
          description: 'テーブルを確認してください',
        });
        form.reset();
      } catch (error) {
        toast({
          title: '更新失敗',
          description: '問い合わせしてください',
          variant: 'destructive',
        });
      }
    } else {
      // 新規追加処理
      try {
        await createItem(data);
        toast({
          title: '追加完了',
          description: 'テーブルを確認してください',
        });
        form.reset();
      } catch (error) {
        toast({
          title: '追加失敗',
          description: '問い合わせしてください',
          variant: 'destructive',
        });
      }
    }
  };

  const buttonText = isUpdateMode ? '更新' : '追加';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, () => alert('フォームの値が不正です'))} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>商品名</FormLabel>
              <FormControl>
                <Input placeholder="あんぱん" {...field} />
              </FormControl>
              <FormDescription>最大で100文字まで</FormDescription>
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
              <FormDescription>0円以上</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {buttonText}しています
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
      {isUpdateMode && (
        <Button
          type="button"
          size="icon"
          variant="destructive"
          onClick={async () => {
            await deleteItem(id);
            toast({
              title: '削除完了',
              description: 'テーブルを確認してください',
            });
          }}
        >
          削除
        </Button>
      )}
    </Form>
  );
}
