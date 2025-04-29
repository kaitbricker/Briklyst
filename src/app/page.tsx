import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Briklyst - Create Your Storefront',
  description: 'Create and customize your own storefront to showcase your products.',
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold">Briklyst</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/sign-in">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Create Your Storefront
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Showcase your products with a beautiful, customizable storefront.
              Share your unique link and start earning from affiliate sales.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/sign-up">
                <Button size="lg">Get started</Button>
              </Link>
              <Link href="/storefronts/demo">
                <Button variant="outline" size="lg">
                  View demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium">Easy Setup</h3>
              <p className="mt-2 text-gray-600">
                Create your storefront in minutes with our simple setup process.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium">Customizable</h3>
              <p className="mt-2 text-gray-600">
                Choose your colors, add your logo, and make it your own.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium">Track Performance</h3>
              <p className="mt-2 text-gray-600">
                Monitor clicks and optimize your product listings.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Briklyst. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
