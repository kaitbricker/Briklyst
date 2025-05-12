import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface EmailCampaignProps {
  onSend: (data: { subject: string; body: string; template: string }) => void;
}

const templates = [
  { id: 'template1', name: 'Template 1', subject: 'Welcome to Our Store!', body: 'Thank you for joining us. Here are some exclusive offers for you.' },
  { id: 'template2', name: 'Template 2', subject: 'New Products Available', body: 'Check out our latest products and enjoy special discounts.' },
];

const EmailCampaign: React.FC<EmailCampaignProps> = ({ onSend }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
      setSelectedTemplate(templateId);
    }
  };

  const handleSend = () => {
    if (!subject || !body) {
      toast({ title: 'Error', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    onSend({ subject, body, template: selectedTemplate });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Email Campaign</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Template</label>
        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>{template.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button onClick={handleSend} className="w-full transition-transform hover:scale-105">Send Campaign</Button>
    </div>
  );
};

export default EmailCampaign; 