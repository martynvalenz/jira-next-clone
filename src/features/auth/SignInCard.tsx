import DottedDashSeparator from '@/components/DottedDashSeparator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { type LoginSchema, loginSchema } from './auth.schema'
import { useLogin } from './api/useLogin'

const SignInCard = () => {
  const {mutate} = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  }

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome back!</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className="p-7 ">
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' placeholder='Enter email address' disabled={false} />
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
                    <Input {...field} type='password' placeholder='Enter password' disabled={false} min={8} max={16} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' size='lg' disabled={false}>
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className='p-7 flex flex-col gap-4'>
        <Button type='button' variant='secondary' className='w-full' size='lg' disabled={false}>
          <FcGoogle className='size-5 mr-2'/>
          Login with Google
        </Button>
        <Button type='button' variant='secondary' className='w-full' size='lg' disabled={false}>
          <FaGithub className='size-5 mr-2'/>
          Login with Github
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedDashSeparator/>
      </div>
      <CardContent className='p-7 flex items-center justify-center text-sm'>
        <p>Don't have an account? <Link href='/sign-up' className='underline text-blue-700'>Sign up</Link></p>
      </CardContent>
    </Card>
  )
}

export default SignInCard