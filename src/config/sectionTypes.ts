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
  icon: LucideIcon
  defaultContent: Record<string, any>
}

export const sectionTypes: SectionType[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'A prominent section at the top of your page with a large image and call-to-action.',
    icon: Image,
    defaultContent: {
      title: 'Welcome to Our Store',
      subtitle: 'Discover our amazing products',
      imageUrl: '',
      ctaText: 'Shop Now',
      ctaLink: '/products',
    },
  },
  {
    id: 'featured_products',
    name: 'Featured Products',
    description: 'Showcase your best-selling or featured products in a grid or carousel.',
    icon: ShoppingBag,
    defaultContent: {
      title: 'Featured Products',
      layout: 'grid',
      products: [],
    },
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Display customer reviews and testimonials to build trust.',
    icon: MessageSquare,
    defaultContent: {
      title: 'What Our Customers Say',
      testimonials: [],
    },
  },
  {
    id: 'collection_grid',
    name: 'Collection Grid',
    description: 'Showcase your product collections',
    icon: LayoutGrid,
    defaultContent: {
      title: 'Our Collections',
      collections: [],
    },
  },
  {
    id: 'team',
    name: 'Team Section',
    description: 'Introduce your team members',
    icon: Users,
    defaultContent: {
      title: 'Meet Our Team',
      members: [],
    },
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Add a newsletter subscription form to collect email addresses.',
    icon: Mail,
    defaultContent: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get the latest updates and offers',
      buttonText: 'Subscribe',
    },
  },
  {
    id: 'collab_highlights',
    name: 'Collaboration Highlights',
    description: 'Showcase your brand collaborations',
    icon: Star,
    defaultContent: {
      title: 'Our Collaborations',
      highlights: [],
    },
  },
  {
    id: 'social_feed',
    name: 'Social Media Feed',
    description: 'Display your social media content',
    icon: Instagram,
    defaultContent: {
      title: 'Follow Us',
      platforms: ['instagram', 'youtube', 'twitter'],
      posts: [],
    },
  },
  {
    id: 'custom_html',
    name: 'Custom HTML',
    description: 'Add custom HTML content with full styling control.',
    icon: Code,
    defaultContent: {
      html: '',
    },
  },
  {
    id: 'text',
    name: 'Text Block',
    description: 'A simple text section with rich formatting options.',
    icon: Type,
    defaultContent: {
      title: 'About Us',
      content: '<p>Add your content here...</p>',
    },
  },
  {
    id: 'image_gallery',
    name: 'Image Gallery',
    description: 'Display a collection of images in a grid or masonry layout.',
    icon: ImageIcon,
    defaultContent: {
      title: 'Our Gallery',
      layout: 'grid',
      images: [],
    },
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Add a contact form for customer inquiries.',
    icon: Contact,
    defaultContent: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      buttonText: 'Send Message',
    },
  },
] 