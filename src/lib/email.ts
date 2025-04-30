import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL as string,
    subject,
    html,
  }
  await sgMail.send(msg)
}

export function newClickAlertTemplate({ productTitle, clickTime }: { productTitle: string; clickTime: string }) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>🔔 New Click on Your Product!</h2>
      <p>Your product <strong>${productTitle}</strong> just received a new click at <strong>${clickTime}</strong>.</p>
      <p>Log in to your dashboard to see more analytics.</p>
      <hr />
      <small>This is an automated notification from Briklyst.</small>
    </div>
  `
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to Briklyst!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>If you did not create an account, you can safely ignore this email.</p>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
    `,
  })
} 