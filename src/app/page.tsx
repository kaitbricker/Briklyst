import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TikTokIcon, InstagramIcon } from '@/components/icons'
import { FadeIn, FadeInStagger, ScaleIn, SlideIn } from '@/components/animations'
import { StorefrontCarousel } from '@/components/StorefrontCarousel'

export const metadata = {
  title: 'Briklyst - Create Your Storefront',
  description: 'Create and customize your own storefront to showcase your products.',
}

// Hero Section Component
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-32 overflow-hidden bg-gradient-to-br from-bubblegum-pink/20 to-lilac-purple/30">
      <div className="absolute inset-0 z-0 bg-[url('/images/hero-bg-texture.png')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <SlideIn direction="up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-midnight-navy leading-tight mb-8 drop-shadow-xl text-center">
            Where Influence Becomes Enterprise
          </h1>
        </SlideIn>
        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-sunset-orange/90 mb-10 font-medium text-center">
            Turn your affiliate links into a fully-branded income engine. No code. No limits. Just results.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Button 
              asChild
              size="lg"
              className="bg-midnight-navy hover:bg-midnight-navy/90 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <Link href="/signup">Start Your Storefront</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-midnight-navy underline text-base font-medium self-center"
            >
              <Link href="#examples">Explore Examples</Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.6}>
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
            <StorefrontCarousel />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Use Cases Section
function UseCases() {
  const useCases = [
    {
      title: 'Lifestyle Influencers',
      desc: 'Turn product recs into passive revenue without relying on brand deals.',
      icon: '🎯'
    },
    {
      title: 'Fashion Bloggers',
      desc: 'Curate collections that reflect your taste and monetize every item.',
      icon: '👗'
    },
    {
      title: 'Affiliate Marketers',
      desc: 'Finally, one branded space to house links from every program you use.',
      icon: '📊'
    },
    {
      title: 'Solo Creators & Coaches',
      desc: 'Build trust with a clean storefront and track what your audience clicks.',
      icon: '🎓'
    },
    {
      title: 'Product Roundups & TikTokers',
      desc: 'Make viral link drops look polished and on-brand.',
      icon: '📱'
    },
    {
      title: 'Anyone Monetizing Online',
      desc: 'If you share links, Briklyst makes them work harder for you.',
      icon: '💡'
    }
  ]

  return (
    <section className="bg-white py-28 px-6 text-center">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Who is Briklyst Perfect For?</h2>
      </FadeIn>
      <FadeInStagger className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
        {useCases.map((item, index) => (
          <ScaleIn key={index} delay={index * 0.1}>
            <div className="text-left hover:scale-[1.02] transition-transform p-6 rounded-xl bg-white/80 shadow-lg border border-gray-100">
              <div className="text-4xl mb-6 text-bubblegum-pink">{item.icon}</div>
              <h3 className="font-bold text-2xl mb-2 text-midnight-navy">{item.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
            </div>
          </ScaleIn>
        ))}
      </FadeInStagger>
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
    <section className="bg-lilac-purple/20 py-24 px-6 text-center">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-midnight-navy">Ready to Launch Your Digital Brand?</h2>
        <p className="text-xl max-w-2xl mx-auto text-gray-800 mb-8">
          Start building your Briklyst today and be part of a movement reshaping how creators grow and earn online.
        </p>
      </FadeIn>
      <ScaleIn delay={0.2}>
        <Button 
          asChild
          size="lg"
          className="bg-midnight-navy hover:bg-midnight-navy/90 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </ScaleIn>
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
    <main className="bg-[#FFFBEF] text-[#1D1E33] font-sans scroll-smooth">
      <Hero />
      <UseCases />
      <HowItWorks />
      <Features />
      <StorefrontPreviews />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
