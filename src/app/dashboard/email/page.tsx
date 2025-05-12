'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmailCampaign from '@/components/EmailCampaign';
import EmailEditorComponent from '@/components/EmailEditor';

const handleSendCampaign = (data: { subject: string; body: string; template: string }) => {
  // Handle sending the email campaign
  console.log('Sending campaign:', data);
  // Add logic to send the email
};

const EmailPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Email Campaigns</h1>
        <EmailCampaign onSend={handleSendCampaign} />
        <EmailEditorComponent />
      </div>
    </div>
  );
};

export default EmailPage; 