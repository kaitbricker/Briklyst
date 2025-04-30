import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TikTokIcon, InstagramIcon } from '@/components/icons'
import { FadeIn, FadeInStagger, ScaleIn, SlideIn } from '@/components/animations'
import { StorefrontCarousel } from '@/components/StorefrontCarousel'
import React, { useEffect, useState } from 'react'

export const metadata = {
  title: 'Briklyst - Create Your Storefront',
  description: 'Create and customize your own storefront to showcase your products.',
}

// Hero Section Component
function Hero() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Briklyst Hero Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-32 w-full max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1D1E33] leading-tight mb-6 drop-shadow-xl">
          Where Influence Becomes Enterprise
        </h1>
        <p className="text-xl md:text-2xl text-[#1D1E33]/80 mb-10 font-medium">
          Turn your affiliate links into a fully-branded income engine. No code. No limits. Just results.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link href="/signup" passHref legacyBehavior>
            <a className="bg-[#1D1E33] hover:bg-[#1D1E33]/90 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300">
              Start Your Storefront
            </a>
          </Link>
          <Link href="#examples" passHref legacyBehavior>
            <a className="text-[#1D1E33] hover:text-[#1D1E33]/80 underline text-base font-medium self-center transition-colors">
              Explore Examples
            </a>
          </Link>
        </div>
        {/* Showcase Image or Carousel */}
        <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/showcase.png"
            alt="Storefront Showcase"
            width={900}
            height={500}
            className="object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
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
      desc: 'Add links from Amazon, LTK, Sephora, and more.',
      icon: '/icons/link.svg',
    },
    {
      title: 'Auto-Generate Products',
      desc: 'We pull product info and images for you.',
      icon: '/icons/auto.svg',
    },
    {
      title: 'Launch Your Storefront',
      desc: 'Get a branded URL or connect your own domain.',
      icon: '/icons/launch.svg',
    },
  ]

  return (
    <section className="bg-white py-20 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-100">
              <Image src={step.icon} alt={step.title} width={56} height={56} className="mb-6 object-contain" />
              <h3 className="font-bold text-xl mb-2 text-[#1D1E33] text-center">{step.title}</h3>
              <p className="text-gray-700 text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const features = [
    { icon: '/icons/no-code.svg', title: 'No tech skills required' },
    { icon: '/icons/branding.svg', title: 'Fully branded to you' },
    { icon: '/icons/analytics.svg', title: 'Click tracking & engagement insights' },
    { icon: '/icons/ai.svg', title: 'AI-generated product descriptions' },
    { icon: '/icons/platform.svg', title: 'Works with any affiliate platform' },
    { icon: '/icons/dashboard.svg', title: 'Earnings dashboard (coming soon)' },
  ]

  return (
    <section className="bg-blue-50 py-20 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <Image src={feature.icon} alt={feature.title} width={48} height={48} className="mb-4 object-contain" />
              <h3 className="text-lg font-semibold text-[#1D1E33] text-center">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Preview Storefronts Section
function StorefrontPreviews() {
  const storefronts = [
    { image: '/storefront1.png', title: 'Beauty & Lifestyle', username: '@beautyessentials', bg: 'bg-pink-100', text: 'text-pink-700' },
    { image: '/storefront2.png', title: 'Fitness Gear', username: '@fitnessfirst', bg: 'bg-green-100', text: 'text-green-700' },
    { image: '/storefront3.png', title: 'Tech Reviews', username: '@techinsider', bg: 'bg-blue-100', text: 'text-blue-700' },
    { image: '/storefront4.png', title: 'Home Finds', username: '@homefinds', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  ]

  // Carousel state for Storefront Previews
  const [currentStore, setCurrentStore] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStore((prev) => (prev + 1) % storefronts.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="examples" className="bg-white py-20 w-full">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">Storefront Previews</h2>
        <div className="relative flex flex-col items-center">
          {storefronts.map((store, idx) => (
            <div
              key={store.title}
              className={`transition-all duration-700 ease-in-out absolute w-full ${idx === currentStore ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'} ${store.bg} rounded-2xl shadow-md p-6 flex flex-col items-center border border-gray-100`}
              style={{ minHeight: 400 }}
            >
              <div className="flex w-full items-center justify-between mb-4">
                <div>
                  <h3 className={`font-bold text-xl mb-1 ${store.text}`}>{store.title}</h3>
                  <span className="text-gray-700 text-sm">{store.username}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                </div>
              </div>
              <Image src={store.image} alt={store.title} width={900} height={400} className="rounded-lg object-cover w-full h-72" />
            </div>
          ))}
          {/* Carousel dots */}
          <div className="flex gap-2 mt-6 z-20 relative">
            {storefronts.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentStore ? 'bg-[#1D1E33]' : 'bg-gray-300'}`}
                onClick={() => setCurrentStore(idx)}
                aria-label={`Show ${storefronts[idx].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      avatar: '/avatars/user1.jpg',
      name: 'Alex Kim',
      quote: 'Briklyst made it so easy to monetize my recommendations. My followers love the new look!',
    },
    {
      avatar: '/avatars/user2.jpg',
      name: 'Jordan Lee',
      quote: 'The analytics and branding features are a game changer for my affiliate business.',
    },
    {
      avatar: '/avatars/user3.jpg',
      name: 'Taylor Smith',
      quote: 'I launched my storefront in minutes and started earning right away. Highly recommend!',
    },
  ]

  return (
    <section className="bg-pink-50 py-20 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-gray-100">
              <Image src={t.avatar} alt={t.name} width={64} height={64} className="rounded-full mb-4 object-cover" />
              <p className="italic text-gray-700 text-center mb-4">“{t.quote}”</p>
              <span className="font-semibold text-[#1D1E33]">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-pink-200 to-blue-200 py-20 w-full text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1D1E33]">Ready to Launch Your Digital Brand?</h2>
        <p className="text-xl text-[#1D1E33]/80 mb-8">
          Start building your Briklyst today and be part of a movement reshaping how creators grow and earn online.
        </p>
        <Link href="/signup" passHref legacyBehavior>
          <a className="bg-[#1D1E33] hover:bg-[#1D1E33]/90 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-pink-300">
            Get Started Now
          </a>
        </Link>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#1D1E33] py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Briklyst Logo" width={120} height={40} className="object-contain invert" />
          <span className="text-white font-bold text-lg">Briklyst</span>
        </div>
        <div className="flex gap-8 text-gray-300">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Image src="/icons/instagram.svg" alt="Instagram" width={28} height={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Image src="/icons/tiktok.svg" alt="TikTok" width={28} height={28} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        Briklyst — Where influence becomes enterprise.
      </div>
    </footer>
  )
}

const personas = [
  {
    title: 'Lifestyle Influencers',
    desc: 'Turn product recommendations into passive revenue without relying on brand deals.',
    icon: '/icons/influencer.svg',
  },
  {
    title: 'Fashion Bloggers',
    desc: 'Curate collections that reflect your taste and monetize every item.',
    icon: '/icons/blogger.svg',
  },
  {
    title: 'Affiliate Marketers',
    desc: 'One branded space to house links from every program you use.',
    icon: '/icons/affiliate.svg',
  },
  {
    title: 'Solo Creators & Coaches',
    desc: 'Build trust with a clean storefront and track what your audience clicks.',
    icon: '/icons/coach.svg',
  },
  {
    title: 'Product Roundups & TikTokers',
    desc: 'Make viral link drops look polished and on-brand.',
    icon: '/icons/tiktok.svg',
  },
  {
    title: 'Anyone Monetizing Online',
    desc: 'If you share links, Briklyst makes them work harder for you.',
    icon: '/icons/monetize.svg',
  },
];

const steps = [
  {
    title: 'Paste Your Links',
    desc: 'Add links from Amazon, LTK, Sephora, and more.',
    icon: '/icons/link.svg',
  },
  {
    title: 'Auto-Generate Products',
    desc: 'We pull product info and images for you.',
    icon: '/icons/auto.svg',
  },
  {
    title: 'Launch Your Storefront',
    desc: 'Get a branded URL or connect your own domain.',
    icon: '/icons/launch.svg',
  },
];

const features = [
  { icon: '/icons/no-code.svg', title: 'No tech skills required' },
  { icon: '/icons/branding.svg', title: 'Fully branded to you' },
  { icon: '/icons/analytics.svg', title: 'Click tracking & engagement insights' },
  { icon: '/icons/ai.svg', title: 'AI-generated product descriptions' },
  { icon: '/icons/platform.svg', title: 'Works with any affiliate platform' },
  { icon: '/icons/dashboard.svg', title: 'Earnings dashboard (coming soon)' },
];

const testimonials = [
  {
    avatar: '/avatars/user1.jpg',
    name: 'Alex Kim',
    quote: 'Briklyst made it so easy to monetize my recommendations. My followers love the new look!',
  },
  {
    avatar: '/avatars/user2.jpg',
    name: 'Jordan Lee',
    quote: 'The analytics and branding features are a game changer for my affiliate business.',
  },
  {
    avatar: '/avatars/user3.jpg',
    name: 'Taylor Smith',
    quote: 'I launched my storefront in minutes and started earning right away. Highly recommend!',
  },
];

export default function Home() {
  // Storefront carousel data and state
  const storefronts = [
    { image: '/storefront1.png', title: 'Beauty & Lifestyle', username: '@beautyessentials', bg: 'bg-pink-100', text: 'text-pink-700' },
    { image: '/storefront2.png', title: 'Fitness Gear', username: '@fitnessfirst', bg: 'bg-green-100', text: 'text-green-700' },
    { image: '/storefront3.png', title: 'Tech Reviews', username: '@techinsider', bg: 'bg-blue-100', text: 'text-blue-700' },
    { image: '/storefront4.png', title: 'Home Finds', username: '@homefinds', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  ];
  const [currentStore, setCurrentStore] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStore((prev) => (prev + 1) % storefronts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [storefronts.length]);

  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Briklyst Hero Background"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-32 w-full max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#1D1E33] leading-tight mb-6 drop-shadow-xl">
            Where Influence Becomes Enterprise
          </h1>
          <p className="text-xl md:text-2xl text-[#1D1E33]/80 mb-10 font-medium">
            Turn your affiliate links into a fully-branded income engine. No code. No limits. Just results.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="/signup" passHref legacyBehavior>
              <a className="bg-[#1D1E33] hover:bg-[#1D1E33]/90 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300">
                Start Your Storefront
              </a>
            </Link>
            <Link href="#examples" passHref legacyBehavior>
              <a className="text-[#1D1E33] hover:text-[#1D1E33]/80 underline text-base font-medium self-center transition-colors">
                Explore Examples
              </a>
            </Link>
          </div>
          {/* Showcase Image or Carousel */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/showcase.png"
              alt="Storefront Showcase"
              width={900}
              height={500}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </main>

      {/* Who is Briklyst Perfect For? Section */}
      <section className="bg-white py-24 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1D1E33]">Who is Briklyst Perfect For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-md p-8 transition-transform hover:-translate-y-1 hover:shadow-xl border border-gray-100"
              >
                <div className="mb-6">
                  <Image
                    src={persona.icon}
                    alt={persona.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-[#1D1E33] text-center">{persona.title}</h3>
                <p className="text-gray-700 text-lg text-center">{persona.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.title} className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-100">
                <Image src={step.icon} alt={step.title} width={56} height={56} className="mb-6 object-contain" />
                <h3 className="font-bold text-xl mb-2 text-[#1D1E33] text-center">{step.title}</h3>
                <p className="text-gray-700 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <Image src={feature.icon} alt={feature.title} width={48} height={48} className="mb-4 object-contain" />
                <h3 className="text-lg font-semibold text-[#1D1E33] text-center">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storefront Previews Carousel Section */}
      <section id="examples" className="bg-white py-20 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">Storefront Previews</h2>
          <div className="relative flex flex-col items-center">
            {storefronts.map((store, idx) => (
              <div
                key={store.title}
                className={`transition-all duration-700 ease-in-out absolute w-full ${idx === currentStore ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'} ${store.bg} rounded-2xl shadow-md p-6 flex flex-col items-center border border-gray-100`}
                style={{ minHeight: 400 }}
              >
                <div className="flex w-full items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-xl mb-1 ${store.text}`}>{store.title}</h3>
                    <span className="text-gray-700 text-sm">{store.username}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                  </div>
                </div>
                <Image src={store.image} alt={store.title} width={900} height={400} className="rounded-lg object-cover w-full h-72" />
              </div>
            ))}
            {/* Carousel dots */}
            <div className="flex gap-2 mt-6 z-20 relative">
              {storefronts.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentStore ? 'bg-[#1D1E33]' : 'bg-gray-300'}`}
                  onClick={() => setCurrentStore(idx)}
                  aria-label={`Show ${storefronts[idx].title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-pink-50 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1D1E33]">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-gray-100">
                <Image src={t.avatar} alt={t.name} width={64} height={64} className="rounded-full mb-4 object-cover" />
                <p className="italic text-gray-700 text-center mb-4">“{t.quote}”</p>
                <span className="font-semibold text-[#1D1E33]">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-pink-200 to-blue-200 py-20 w-full text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1D1E33]">Ready to Launch Your Digital Brand?</h2>
          <p className="text-xl text-[#1D1E33]/80 mb-8">
            Start building your Briklyst today and be part of a movement reshaping how creators grow and earn online.
          </p>
          <Link href="/signup" passHref legacyBehavior>
            <a className="bg-[#1D1E33] hover:bg-[#1D1E33]/90 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-pink-300">
              Get Started Now
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1E33] py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Briklyst Logo" width={120} height={40} className="object-contain invert" />
            <span className="text-white font-bold text-lg">Briklyst</span>
          </div>
          <div className="flex gap-8 text-gray-300">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Image src="/icons/instagram.svg" alt="Instagram" width={28} height={28} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Image src="/icons/tiktok.svg" alt="TikTok" width={28} height={28} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          Briklyst — Where influence becomes enterprise.
        </div>
      </footer>
    </>
  );
}
