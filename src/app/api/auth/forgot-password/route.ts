import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive a password reset link.' },
        { status: 200 }
      )
    }

    // Generate reset token
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    // Create or update reset token
    await prisma.verificationToken.upsert({
      where: {
        identifier: email
      },
      update: {
        token,
        expires
      },
      create: {
        identifier: email,
        token,
        expires
      }
    })

    // Send reset email
    await sendPasswordResetEmail(email, token)

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 