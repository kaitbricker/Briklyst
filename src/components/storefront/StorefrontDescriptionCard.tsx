'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface StorefrontDescriptionCardProps {
  description: string;
  tags: string[];
  category: string;
}

export default function StorefrontDescriptionCard({
  description,
  tags,
  category,
}: StorefrontDescriptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
    >
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="space-y-6">
            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Category and Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                {category}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm font-medium rounded-full bg-orange-50 text-orange-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 