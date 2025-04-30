import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { sign, verify } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Check required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set')
}

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // If name is provided, it's a sign-up request
    if (name) {
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        })

        if (existingUser) {
          return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
          )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })

        // Create storefront for the user
        await prisma.storefront.create({
          data: {
            userId: user.id,
            title: `${name}'s Storefront`,
            description: 'Welcome to my storefront!',
          },
        })

        // Generate session token
        const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: '7d',
        })

        // Set cookie
        const response = NextResponse.json({ 
          user: { 
            id: user.id, 
            email: user.email,
            name: user.name 
          },
          message: 'Account created successfully'
        })
        response.cookies.set('session-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        return response
      } catch (error) {
        console.error('User creation error:', error)
        if (error instanceof Error && error.message.includes('Unique constraint')) {
          return NextResponse.json(
            { error: 'Email already in use' },
            { status: 400 }
          )
        }
        throw error // Re-throw for general error handling
      }
    }

    // Otherwise, it's a sign-in request
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate session token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    // Set cookie
    const response = NextResponse.json({ user: { id: user.id, email: user.email } })
    response.cookies.set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token and get user
    const { userId } = verify(token, process.env.JWT_SECRET!) as {
      userId: string
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ message: 'Signed out successfully' })
    response.cookies.delete('session-token')
    return response
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 