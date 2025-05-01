import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BulkProduct {
  title: string;
  affiliateUrl: string;
  imageUrl: string;
  price: string;
}

export default function BulkImportProducts({ onBulkSubmit }: { onBulkSubmit: (products: BulkProduct[]) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [products, setProducts] = useState<BulkProduct[]>([]);
  const [step, setStep] = useState<'input' | 'preview'>('input');

  // Basic parser: one link per line, try to extract title from URL
  const parseLinks = () => {
    const lines = input.split('\n').map(l => l.trim()).filter(Boolean);
    const parsed = lines.map(link => {
      let title = link;
      try {
        const url = new URL(link);
        // Try to get something readable from the pathname
        const parts = url.pathname.split('/').filter(Boolean);
        title = decodeURIComponent(parts[parts.length - 1] || url.hostname);
      } catch {}
      return {
        title,
        affiliateUrl: link,
        imageUrl: '',
        price: '',
      };
    });
    setProducts(parsed);
    setStep('preview');
  };

  const handleFieldChange = (idx: number, field: keyof BulkProduct, value: string) => {
    setProducts(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleRemove = (idx: number) => {
    setProducts(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    onBulkSubmit(products);
    setOpen(false);
    setInput('');
    setProducts([]);
    setStep('input');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Bulk Import Products</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Import Products</DialogTitle>
        </DialogHeader>
        {step === 'input' ? (
          <div className="space-y-4">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste affiliate links here, one per line"
              rows={8}
            />
            <Button onClick={parseLinks} disabled={!input.trim()}>Preview</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Affiliate URL</th>
                    <th className="p-2 border">Image URL</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">
                        <Input value={p.title} onChange={e => handleFieldChange(idx, 'title', e.target.value)} />
                      </td>
                      <td className="p-2 border">
                        <Input value={p.affiliateUrl} onChange={e => handleFieldChange(idx, 'affiliateUrl', e.target.value)} />
                      </td>
                      <td className="p-2 border">
                        <Input value={p.imageUrl} onChange={e => handleFieldChange(idx, 'imageUrl', e.target.value)} />
                      </td>
                      <td className="p-2 border">
                        <Input value={p.price} onChange={e => handleFieldChange(idx, 'price', e.target.value)} />
                      </td>
                      <td className="p-2 border text-center">
                        <Button variant="destructive" size="sm" onClick={() => handleRemove(idx)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep('input')}>Back</Button>
              <Button onClick={handleSubmit} disabled={products.length === 0}>Submit All</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 