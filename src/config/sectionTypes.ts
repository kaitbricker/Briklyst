import {
  Image,
  LayoutGrid,
  MessageSquare,
  ShoppingBag,
  Users,
  Mail,
  Star,
  Instagram,
  Youtube,
  Twitter,
  Code,
  LucideIcon,
  Type,
  Image as ImageIcon,
  Contact,
} from 'lucide-react'

interface SectionType {
  id: string
  name: string
  description: string
  defaultContent: any
}

export const sectionTypes: SectionType[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'A prominent section at the top of your storefront',
    defaultContent: {
      title: 'Welcome to Our Store',
      subtitle: 'Discover our amazing products',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      backgroundImage: '',
      layout: 'centered',
    },
  },
  {
    id: 'featured-products',
    name: 'Featured Products',
    description: 'Showcase your best-selling products',
    defaultContent: {
      title: 'Featured Products',
      subtitle: 'Our most popular items',
      layout: 'grid',
      columns: 3,
      products: [],
    },
  },
  {
    id: 'category-showcase',
    name: 'Category Showcase',
    description: 'Display your product categories',
    defaultContent: {
      title: 'Shop by Category',
      layout: 'grid',
      columns: 4,
      categories: [],
    },
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Show customer reviews and feedback',
    defaultContent: {
      title: 'What Our Customers Say',
      layout: 'carousel',
      testimonials: [],
    },
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Collect email addresses for your newsletter',
    defaultContent: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get updates on new products and special offers',
      buttonText: 'Subscribe',
      layout: 'centered',
    },
  },
  {
    id: 'social-feed',
    name: 'Social Media Feed',
    description: 'Display your social media posts',
    defaultContent: {
      title: 'Follow Us',
      platform: 'instagram',
      layout: 'grid',
      columns: 3,
      posts: [],
    },
  },
  {
    id: 'brand-showcase',
    name: 'Brand Showcase',
    description: 'Highlight partner brands or manufacturers',
    defaultContent: {
      title: 'Our Brands',
      layout: 'carousel',
      brands: [],
    },
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    description: 'Display frequently asked questions',
    defaultContent: {
      title: 'Frequently Asked Questions',
      layout: 'accordion',
      questions: [],
    },
  },
  {
    id: 'contact',
    name: 'Contact Section',
    description: 'Provide contact information and form',
    defaultContent: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      email: '',
      phone: '',
      address: '',
      formEnabled: true,
    },
  },
  {
    id: 'custom-html',
    name: 'Custom HTML',
    description: 'Add custom HTML content',
    defaultContent: {
      html: '',
      css: '',
    },
  },
] 