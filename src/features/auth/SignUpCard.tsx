'use client'

import DottedDashSeparator from '@/components/DottedDashSeparator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRegister } from './api/useRegister'

const SignUpCard = () => {
  const formSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }).max(100, { message: 'Name must be at most 100 characters long' }),
    email: z.string().max(100).email(),
    password: z.string().trim().min(1, { message: 'Password is required' }).max(16, { message: 'Password must be at most 16 characters long' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const {mutate, isPending} = useRegister();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  }

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}<Link href='/terms' className='underline text-blue-700'>Terms of Service</Link> and{" "}<Link href='/privacy' className='underline text-blue-700'>Privacy Policy</Link>.
        </CardDescription>
      </CardHeader>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className="p-7 ">
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Enter name' disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder='Enter email address' disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='Enter password' disabled={isPending} min={8} max={16} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' size='lg' disabled={isPending}>
            Create account
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className='p-7 flex flex-col gap-4'>
        <Button type='button' variant='secondary' className='w-full' size='lg' disabled={isPending}>
          <FcGoogle className='size-5 mr-2'/>
          Login with Google
        </Button>
        <Button type='button' variant='secondary' className='w-full' size='lg' disabled={isPending}>
          <FaGithub className='size-5 mr-2'/>
          Login with Github
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className='p-7 flex items-center justify-center text-sm'>
        <p>Already have an account? <Link href='/sign-in' className='underline text-blue-700'>Log in</Link></p>
      </CardContent>
    </Card>
  )
}

export default SignUpCard