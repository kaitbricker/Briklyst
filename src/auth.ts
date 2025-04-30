// @ts-expect-error Type conflicts between NextAuth's built-in types and our custom types for email preferences
import NextAuth from 'next-auth/next'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
      emailAlerts?: boolean
      weeklyReport?: boolean
      monthlyReport?: boolean
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    emailAlerts?: boolean
    weeklyReport?: boolean
    monthlyReport?: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user) {
        session.user.emailAlerts = token.emailAlerts
        session.user.weeklyReport = token.weeklyReport
        session.user.monthlyReport = token.monthlyReport
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({ 
          where: { id: user.id },
          select: {
            emailAlerts: true,
            weeklyReport: true,
            monthlyReport: true
          }
        })
        if (dbUser) {
          token.emailAlerts = dbUser.emailAlerts
          token.weeklyReport = dbUser.weeklyReport
          token.monthlyReport = dbUser.monthlyReport
        }
      }
      return token
    },
  },
}) 