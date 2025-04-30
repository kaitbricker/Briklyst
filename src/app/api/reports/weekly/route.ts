import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET() {
  // This route will be called by Vercel Cron
  try {
    // Find all users who want weekly reports
    const users = await prisma.user.findMany({
      where: { weeklyReport: true },
      select: { id: true, email: true, name: true },
    })

    // For each user, send a test email (replace with real analytics later)
    for (const user of users) {
      if (!user.email) continue
      await sendEmail({
        to: user.email,
        subject: 'Your Weekly Briklyst Analytics Report',
        html: `<h1>Hi ${user.name || 'there'},</h1><p>This is your weekly analytics report. (Real data coming soon!)</p>`,
      })
    }

    return NextResponse.json({ message: `Sent weekly reports to ${users.length} users.` })
  } catch (error) {
    console.error('Weekly report error:', error)
    return NextResponse.json({ error: 'Failed to send weekly reports' }, { status: 500 })
  }
} 