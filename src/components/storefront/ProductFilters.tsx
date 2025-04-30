'use client';

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
      <h3 className="text-lg font-semibold mb-4">Filter by Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
} 