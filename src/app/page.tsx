import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TikTokIcon, InstagramIcon } from '@/components/icons'
import { FadeIn, FadeInStagger, ScaleIn, SlideIn, FloatingAnimation } from '@/components/animations'

export const metadata = {
  title: 'Briklyst - Create Your Storefront',
  description: 'Create and customize your own storefront to showcase your products.',
}

// Hero Section Component
function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight-navy py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <SlideIn direction="left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Where influence becomes enterprise.
              </h1>
            </SlideIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-gray-300">
                Briklyst transforms your affiliate links into a powerful, personalized storefront — in minutes.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-8 flex gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-bubblegum-pink hover:bg-bubblegum-pink/90"
                >
                  <Link href="/signup">Start Your Storefront</Link>
                </Button>
                <Button
                  variant="link"
                  asChild
                  className="text-white hover:text-bubblegum-pink"
                >
                  <Link href="#examples">See Live Examples</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
          <div className="relative">
            <FloatingAnimation>
              <div className="rounded-lg bg-white/10 p-8">
                <div className="aspect-[4/3] rounded-lg bg-white/5"></div>
              </div>
            </FloatingAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      title: 'Paste Your Links',
      description: 'Add links from Amazon, LTK, Sephora, and more.',
      icon: '🔗'
    },
    {
      title: 'Auto-Generate Products',
      description: "We'll pull the product info and images for you.",
      icon: '✨'
    },
    {
      title: 'Launch Your Storefront',
      description: 'Get a branded URL or connect your own domain.',
      icon: '🚀'
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold">Build your brand in 3 simple steps</h2>
        </FadeIn>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="mb-4 text-4xl">{step.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </ScaleIn>
          ))}
        </FadeInStagger>
        <FadeIn delay={0.6}>
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg">
              <Link href="/signup">Try it in under 5 minutes →</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const features = [
    { icon: '⚡', title: 'No tech skills required' },
    { icon: '🎨', title: 'Fully branded to you' },
    { icon: '📈', title: 'Click tracking & engagement insights' },
    { icon: '🧠', title: 'AI-generated product descriptions' },
    { icon: '🔗', title: 'Works with any affiliate platform' },
    { icon: '💼', title: 'Coming soon: Earnings dashboard' }
  ]

  return (
    <section className="bg-lilac-purple py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-white">Built for creators who mean business</h2>
        </FadeIn>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <div className="rounded-lg bg-white p-6">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
            </ScaleIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}

// Preview Storefronts Section
function StorefrontPreviews() {
  return (
    <section id="examples" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold">Real Storefronts. Real Results.</h2>
        </FadeIn>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-lg bg-gray-100">
                <div className="aspect-[4/3]"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button className="bg-bubblegum-pink hover:bg-bubblegum-pink/90">
                    View Storefront
                  </Button>
                </div>
              </div>
            </ScaleIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}

// Testimonials Section
function Testimonials() {
  return (
    <section className="bg-midnight-navy py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-white">What early users are saying</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-16">
            <blockquote className="mx-auto max-w-2xl rounded-lg bg-white/10 p-8 text-center text-white">
              <p className="text-xl italic">
                &quot;Exactly what I needed — clean, simple, and actually makes me money.&quot;
              </p>
              <footer className="mt-4">
                <cite className="text-gray-300">— @earlyuser</cite>
              </footer>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="bg-sunset-orange py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white">Ready to turn your links into a brand?</h2>
          <p className="mt-4 text-lg text-white/80">Where influence becomes enterprise.</p>
        </FadeIn>
        <ScaleIn delay={0.2}>
          <Button 
            asChild
            size="lg"
            className="mt-8 bg-bubblegum-pink hover:bg-bubblegum-pink/90"
          >
            <Link href="/signup">Join the First 100 Creators</Link>
          </Button>
        </ScaleIn>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-midnight-navy py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FadeIn>
            <div>
              <Image 
                src="/logo.png" 
                alt="Briklyst" 
                width={120} 
                height={40}
                className="invert"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <h3 className="mb-4 font-semibold text-white">Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/terms">Terms of Use</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h3 className="mb-4 font-semibold text-white">Social</h3>
              <div className="flex space-x-4">
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TikTokIcon className="h-6 w-6" />
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </FadeInStagger>
        <FadeIn delay={0.3}>
          <div className="mt-8 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-gray-300">
              Briklyst — Where influence becomes enterprise.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <StorefrontPreviews />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
