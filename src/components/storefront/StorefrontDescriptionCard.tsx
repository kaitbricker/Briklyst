import React from 'react';

interface StorefrontDescriptionCardProps {
  description: string;
  tags: string[];
  category?: string;
}

export default function StorefrontDescriptionCard({ description, tags, category }: StorefrontDescriptionCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 mb-10">
      <div className="mb-2 text-gray-500 text-sm font-medium">{category}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-lg font-semibold mb-2">Your Ultimate Travel Guide</div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
} 