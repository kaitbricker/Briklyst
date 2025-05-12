import React from 'react';

interface LivePreviewProps {
  formData: {
    name: string;
    tagline: string;
    description: string;
    logoUrl?: string;
    bannerUrl?: string;
  };
}

const LivePreview: React.FC<LivePreviewProps> = ({ formData }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-2">{formData.name}</h2>
      <p className="text-gray-600 mb-4">{formData.tagline}</p>
      <p className="text-gray-700">{formData.description}</p>
      {formData.logoUrl && <img src={formData.logoUrl} alt="Logo" className="w-16 h-16 mt-4" />}
      {formData.bannerUrl && <img src={formData.bannerUrl} alt="Banner" className="w-full h-32 mt-4 object-cover" />}
    </div>
  );
};

export default LivePreview; 