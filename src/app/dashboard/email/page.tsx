'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Email Campaigns</h1>
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">No email campaigns yet. Create your first campaign to get started.</p>
          <Button>Create Campaign</Button>
        </div>
      </Card>
    </div>
  );
} 