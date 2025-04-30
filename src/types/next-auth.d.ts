declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      profileImage?: string | null
      bio?: string | null
      twitter?: string | null
      instagram?: string | null
      linkedin?: string | null
      emailAlerts?: boolean
      weeklyReport?: boolean
      monthlyReport?: boolean
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    profileImage?: string | null
    bio?: string | null
    twitter?: string | null
    instagram?: string | null
    linkedin?: string | null
    emailAlerts?: boolean
    weeklyReport?: boolean
    monthlyReport?: boolean
  }
} 