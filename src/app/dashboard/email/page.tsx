'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmailCampaign from '@/components/EmailCampaign';

const handleSendCampaign = (data: { subject: string; body: string; template: string }) => {
  // Handle sending the email campaign
  console.log('Sending campaign:', data);
  // Add logic to send the email
};

export default function EmailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Email Campaigns</h1>
        <EmailCampaign onSend={handleSendCampaign} />
      </div>
    </div>
  );
} 