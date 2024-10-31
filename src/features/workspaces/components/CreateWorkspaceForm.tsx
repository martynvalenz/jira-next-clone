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

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({onCancel}: CreateWorkspaceFormProps) => {
  const {mutate: createWorkspace, isPending} = useCreateWorkspace();

  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: CreateWorkspaceSchema) => {
    createWorkspace({name: data.name})
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