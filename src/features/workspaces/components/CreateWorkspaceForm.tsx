'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type CreateWorkspaceSchema, createWorkspaceSchema } from "../schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedDashSeparator from "@/components/DottedDashSeparator";
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/useCreateWorkspace";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({onCancel}: CreateWorkspaceFormProps) => {
  const {mutate: createWorkspace, isPending} = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      image: undefined,
    },
  });

  const onSubmit = (data: CreateWorkspaceSchema) => {
    const finalValues = {
      ...data,
      image: data.image instanceof File ? data.image : '',
    }
    createWorkspace({name: finalValues.name, image: finalValues.image})
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      form.setValue('image', file);
    }
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7 flex">
        <CardTitle className="text-2xl font-semibold">Create new Workspace</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedDashSeparator/>
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Workspace Name" {...field} disabled={isPending}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({field}) => (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-x-5">
                    {
                      field.value ? (
                        <div className="relative size-[72px] rounded-md overflow-hidden">
                          <Image 
                            src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value} 
                            alt="Workspace Image" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )
                    }
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">Workspace Image</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, SVG or JPEG. Max size 1 MB.
                      </p>
                      <input type="file" className="hidden" ref={inputRef} accept=".jpg,.jpeg,.png,.svg" disabled={isPending} onChange={handleImageChange} />
                      <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
            <div className="flex justify-end items-center gap-2">
              <Button type="button" size="lg" variant="secondary" onClick={onCancel}>Cancel</Button>
              <Button type="submit" size="lg" disabled={isPending}>Create Workspace</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};