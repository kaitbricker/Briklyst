export interface StorefrontSettings {
  id: string
  userId: string
  templateId: string
  templateOverrides?: {
    colors?: {
      primary?: string
      secondary?: string
      accent?: string
      background?: string
      text?: string
    }
    fonts?: {
      heading?: string
      body?: string
    }
    layout?: {
      spacing?: string
      containerWidth?: string
      borderRadius?: string
    }
  }
  brandingAssets?: {
    logo?: string
    banner?: string
    favicon?: string
    buttonStyles?: {
      primary?: string
      secondary?: string
    }
    colorPalette?: string[]
  }
  layout?: {
    headerStyle?: 'minimal' | 'standard' | 'expanded'
    footerStyle?: 'minimal' | 'standard' | 'expanded'
    sidebarPosition?: 'left' | 'right'
    showBreadcrumbs?: boolean
    containerWidth?: number
    spacing?: number
  }
  typography?: {
    headingFont?: string
    bodyFont?: string
    baseSize?: number
    scale?: number
  }
  sections?: Array<{
    id: string
    type: string
    content: any
    order: number
  }>
  customCSS?: string
  socialLinks?: Array<{
    platform: string
    url: string
    order: number
  }>
  collabHighlights?: Array<{
    id: string
    title: string
    description: string
    imageUrl: string
    link?: string
  }>
  subscriberBlock?: {
    enabled: boolean
    title?: string
    description?: string
    buttonText?: string
    successMessage?: string
  }
  createdAt: Date
  updatedAt: Date
} 