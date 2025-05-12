import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  design: any;
  html: string;
  createdAt: string;
  thumbnail?: string;
}

interface EmailTemplateLibraryProps {
  onUse: (design: any) => void;
  lastLoadedDesign?: any;
  lastLoadedHtml?: string;
}

const EmailTemplateLibrary: React.FC<EmailTemplateLibraryProps> = ({ onUse, lastLoadedDesign, lastLoadedHtml }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = () => {
    setLoading(true);
    fetch('/api/email/templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this template?')) return;
    fetch('/api/email/templates', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          toast({ title: 'Template deleted.' });
          fetchTemplates();
        } else {
          toast({ title: 'Failed to delete template', description: result.error || 'Unknown error', variant: 'destructive' });
        }
      })
      .catch(err => {
        toast({ title: 'Error deleting template', description: err.message, variant: 'destructive' });
      });
  };

  const handleEdit = (t: EmailTemplate) => {
    const newName = window.prompt('New template name?', t.name);
    if (!newName) return;
    fetch('/api/email/templates', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: t.id,
        name: newName,
        design: lastLoadedDesign || t.design,
        html: lastLoadedHtml || t.html,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          toast({ title: 'Failed to update template', description: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Template updated!', description: `Renamed to "${newName}"` });
          fetchTemplates();
        }
      })
      .catch(err => {
        toast({ title: 'Error updating template', description: err.message, variant: 'destructive' });
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Template Library</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => { /* TODO: New Template */ }}>
          New Template
        </button>
      </div>
      {loading ? (
        <div>Loading templates...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.id} className="border rounded shadow p-4 flex flex-col gap-2 bg-white">
              {t.thumbnail ? (
                <img src={t.thumbnail} alt={t.name + ' thumbnail'} className="w-full h-32 object-cover rounded mb-2" />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded mb-2 text-gray-400 text-xs">No Thumbnail</div>
              )}
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-gray-500">Created: {new Date(t.createdAt).toLocaleString()}</div>
              <div className="flex gap-2 mt-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => onUse(t.design)}>Use</button>
                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded" onClick={() => setPreviewHtml(t.html)}>Preview</button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(t)}>Edit</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {previewHtml && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setPreviewHtml(null)}
            >
              &times;
            </button>
            <div className="overflow-auto max-h-[70vh]" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateLibrary; 