'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Theme } from '@/lib/themes'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Heart, Share2, ShoppingCart } from 'lucide-react'

interface ThemePreviewProps {
  theme: Theme
  storefrontData: any
}

export default function ThemePreview({ theme, storefrontData }: ThemePreviewProps) {
  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-gray-100 hover:border-gray-200 transition-all">
            <div className="space-y-8">
              {/* Header Section */}
              <div className="relative">
                <motion.div 
                  className="aspect-[21/9] relative overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={storefrontData?.bannerUrl || '/placeholder-banner.png'}
                    alt="Store Banner"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: theme.bannerStyle.overlay,
                    }}
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: theme.bannerStyle.gradient,
                    }}
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-16 left-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="w-32 h-32 rounded-full overflow-hidden relative transition-all duration-300"
                    style={{
                      border: theme.imageStyle.border,
                      boxShadow: theme.imageStyle.shadow,
                    }}
                  >
                    <Image
                      src={storefrontData?.logoUrl || '/placeholder-logo.png'}
                      alt="Store Logo"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Store Info */}
              <div className="pt-20">
                <motion.h1 
                  className="text-3xl font-bold mb-2 transition-colors duration-300"
                  style={{ fontFamily: theme.fontFamily.heading, color: theme.textColor }}
                >
                  {storefrontData?.name}
                </motion.h1>
                <motion.p 
                  className="text-lg transition-colors duration-300"
                  style={{ fontFamily: theme.fontFamily.body, color: theme.textColor }}
                >
                  {storefrontData?.description}
                </motion.p>
              </div>

              {/* Social Links */}
              {storefrontData?.socials && (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {storefrontData.socials.instagram && (
                    <motion.a 
                      href={storefrontData.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.textColor }}
                      className="hover:underline transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Instagram
                    </motion.a>
                  )}
                  {storefrontData.socials.twitter && (
                    <motion.a 
                      href={storefrontData.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.textColor }}
                      className="hover:underline transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Twitter
                    </motion.a>
                  )}
                  {storefrontData.socials.tiktok && (
                    <motion.a 
                      href={storefrontData.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.textColor }}
                      className="hover:underline transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      TikTok
                    </motion.a>
                  )}
                </motion.div>
              )}

              {/* Featured Products */}
              <div className="space-y-4">
                <motion.h2 
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ fontFamily: theme.fontFamily.heading }}
                >
                  Featured Products
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storefrontData?.products?.slice(0, 3).map((product: any) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div 
                          className="aspect-square relative transition-all duration-300"
                          style={{
                            border: theme.imageStyle.border,
                            boxShadow: theme.imageStyle.shadow,
                          }}
                        >
                          <Image
                            src={product.imageUrl || '/placeholder-product.png'}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <motion.div 
                            className="absolute top-2 right-2"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 
                            className="font-semibold transition-colors duration-300"
                            style={{ fontFamily: theme.fontFamily.heading }}
                          >
                            {product.title}
                          </h3>
                          <p className="text-2xl font-bold transition-colors duration-300">
                            ${product.price}
                          </p>
                          <div className="flex gap-2">
                            <motion.button
                              className={cn(
                                "flex-1 transition-all duration-200",
                                theme.buttonStyle
                              )}
                              style={{ backgroundColor: theme.primaryColor }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </motion.button>
                            <motion.button
                              className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Share2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Theme Elements Showcase */}
              <div className="space-y-4 pt-4">
                <motion.h2
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ fontFamily: theme.fontFamily.heading }}
                >
                  Theme Elements
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <h3 className="font-semibold mb-2">Typography</h3>
                      <div className="space-y-2">
                        <p 
                          className="text-lg transition-colors duration-300"
                          style={{ fontFamily: theme.fontFamily.heading }}
                        >
                          Heading Font: {theme.fontFamily.heading}
                        </p>
                        <p 
                          className="text-base transition-colors duration-300"
                          style={{ fontFamily: theme.fontFamily.body }}
                        >
                          Body Font: {theme.fontFamily.body}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Colors</h3>
                      <div className="flex gap-2">
                        {[theme.primaryColor, theme.accentColor, theme.backgroundColor].map((color, index) => (
                          <motion.div
                            key={index}
                            className="w-8 h-8 rounded-full shadow-sm transition-all duration-300"
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div>
                      <h3 className="font-semibold mb-2">Buttons & Elements</h3>
                      <div className="space-y-2">
                        <motion.button
                          className={cn(
                            "w-full transition-all duration-200",
                            theme.buttonStyle
                          )}
                          style={{ backgroundColor: theme.primaryColor }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Button Style
                        </motion.button>
                        <div 
                          className="h-1 w-full transition-all duration-300"
                          style={{ border: theme.accentElements.dividers }}
                        />
                        <div className="flex gap-2">
                          <motion.span 
                            className={theme.accentElements.icons}
                            whileHover={{ scale: 1.1 }}
                          >
                            Icon 1
                          </motion.span>
                          <motion.span 
                            className={theme.accentElements.icons}
                            whileHover={{ scale: 1.1 }}
                          >
                            Icon 2
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}