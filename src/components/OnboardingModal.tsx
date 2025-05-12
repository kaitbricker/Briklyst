import React, { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface OnboardingModalProps {
  onComplete: () => void;
  onClose?: () => void;
  user?: { name?: string; email?: string };
}

const steps = [
  'Welcome',
  'Storefront Setup',
  'Affiliate Connection',
  'Add First Product',
  'Profile Customization',
  'Finish',
];

export default function OnboardingModal({ onComplete, onClose, user }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [storefrontName, setStorefrontName] = useState('');
  const [storefrontTitle, setStorefrontTitle] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setLoading(true);
    setError('');
    try {
      // Save storefront info
      const storefrontRes = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: storefrontName,
          title: storefrontTitle,
        }),
      });
      if (!storefrontRes.ok) throw new Error('Failed to save storefront info');

      // Save profile info (if provided)
      if (profileBio || profilePhoto) {
        const profileRes = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bio: profileBio,
            profileImage: profilePhoto,
          }),
        });
        if (!profileRes.ok) throw new Error('Failed to save profile info');
      }
      toast({ title: 'Success', description: 'Onboarding complete!' });
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to save onboarding data');
      toast({ title: 'Error', description: err.message || 'Failed to save onboarding data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open onOpenChange={open => { if (!open && onClose) onClose(); }}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>
            {steps[step] === 'Welcome' && `Welcome to Briklyst, ${user?.name || ''}!`}
            {steps[step] === 'Storefront Setup' && 'Set Up Your Storefront'}
            {steps[step] === 'Affiliate Connection' && 'Connect Affiliate Link (Optional)'}
            {steps[step] === 'Add First Product' && 'Add Your First Product (Optional)'}
            {steps[step] === 'Profile Customization' && 'Customize Your Profile'}
            {steps[step] === 'Finish' && 'You&apos;re All Set!'}
          </DialogTitle>
        </DialogHeader>
        <DialogPrimitive.Close asChild>
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden>×</span>
          </button>
        </DialogPrimitive.Close>
        <div className="mt-4 space-y-6">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((s, i) => (
              <div key={s} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-gradient-to-r from-orange-400 to-pink-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>

          {/* Step Content */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-lg text-gray-700 mb-4">Let&apos;s get your digital storefront up and running in a few quick steps.</p>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white" onClick={next}>Let&apos;s Go</Button>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Input placeholder="Storefront Name" value={storefrontName} onChange={e => setStorefrontName(e.target.value)} />
              <Input placeholder="Storefront Title" value={storefrontTitle} onChange={e => setStorefrontTitle(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={prev} variant="outline" className="flex-1">Back</Button>
                <Button onClick={next} className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white">Next</Button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Input placeholder="Affiliate Link (optional)" value={affiliateLink} onChange={e => setAffiliateLink(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={prev} variant="outline" className="flex-1">Back</Button>
                <Button onClick={next} className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white">Next</Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Input placeholder="Product Title (optional)" value={productTitle} onChange={e => setProductTitle(e.target.value)} />
              <Textarea placeholder="Product Description (optional)" value={productDesc} onChange={e => setProductDesc(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={prev} variant="outline" className="flex-1">Back</Button>
                <Button onClick={next} className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white">Next</Button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Input placeholder="Profile Photo URL (optional)" value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} />
              <Textarea placeholder="Short Bio (optional)" value={profileBio} onChange={e => setProfileBio(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={prev} variant="outline" className="flex-1">Back</Button>
                <Button onClick={next} className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white">Next</Button>
              </div>
            </motion.div>
          )}
          {step === 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
              <p className="text-lg font-semibold text-gray-700 mb-4">You&apos;re ready to start building your Briklyst storefront!</p>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white" onClick={handleFinish} disabled={loading}>
                {loading ? 'Saving...' : 'Finish'}
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </DialogPrimitive.Root>
  );
} 