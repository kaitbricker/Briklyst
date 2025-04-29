'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold">
            Briklyst
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/auth/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
} 