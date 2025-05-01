'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export default function ProductFilters({
  tags,
  selectedTags,
  onTagSelect,
}: ProductFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Collections</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagSelect('')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => onTagSelect(tag)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-orange-100 text-orange-700 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 