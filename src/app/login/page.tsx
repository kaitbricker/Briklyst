'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      if (!email || !password) {
        throw new Error('Please enter both email and password')
      }

      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (response?.error) {
        if (response.error === 'CredentialsSignin') {
          throw new Error('Invalid email or password')
        }
        throw new Error(response.error)
      }

      router.push('/dashboard')
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
              />
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              Sign In
            </Button>
          </div>
        </form>
        <p className="px-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline hover:text-gray-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
} 