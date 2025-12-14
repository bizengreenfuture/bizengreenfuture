'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Get the app URL for email links
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface QuoteFormProps {
  defaultInterest?: 'supertech' | 'fertilizers' | 'feed' | 'general';
  source?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export default function QuoteForm({
  defaultInterest = 'general',
  source = 'website',
  title = 'Request a Quote',
  description = 'Fill out the form below and our team will get back to you within 24 hours.',
  compact = false,
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: defaultInterest,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createLead = useMutation(api.leads.create);
  const createNotification = useMutation(api.notifications.createForRole);

  const interestLabels: Record<string, string> = {
    supertech: 'SuperTech Combustion',
    fertilizers: 'Organic Fertilizers',
    feed: 'Animal Feed (Calcifeed)',
    general: 'General Inquiry',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save lead to database
      await createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        interest: formData.interest,
        source: source,
        notes: formData.message || undefined,
      });

      // 2. Create in-app notification for admins
      await createNotification({
        type: 'lead_new',
        title: 'New Lead Captured',
        message: `${formData.name} is interested in ${interestLabels[formData.interest]}`,
        link: '/admin/leads',
        role: 'admin',
      });

      // 3. Send email notification (non-blocking)
      sendEmailNotification();

      setIsSubmitted(true);
      toast.success('Quote request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailNotification = async () => {
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new_lead',
          to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'info@bizengreenfuture.com'],
          data: {
            leadName: formData.name,
            leadEmail: formData.email,
            leadPhone: formData.phone || undefined,
            company: formData.company || undefined,
            interest: formData.interest,
            source: source,
            adminDashboardUrl: `${APP_URL}/admin/leads`,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <Card className={`border-2 border-green-200 bg-green-50 ${compact ? '' : 'max-w-xl mx-auto'}`}>
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your quote request has been submitted. Our team will contact you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                interest: defaultInterest,
                message: '',
              });
            }}
            variant="outline"
            className="border-2 border-green-600 text-green-600 hover:bg-green-100"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-green-100 ${compact ? '' : 'max-w-xl mx-auto'}`}>
      <CardHeader className={compact ? 'pb-4' : ''}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+256 7XX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company/Farm Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company or farm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">Interested In *</Label>
            <Select
              value={formData.interest}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  interest: value as 'supertech' | 'fertilizers' | 'feed' | 'general',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supertech">SuperTech Combustion Technology</SelectItem>
                <SelectItem value="fertilizers">Organic Fertilizers</SelectItem>
                <SelectItem value="feed">Animal Feed (Calcifeed)</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your needs, fleet size, farm acreage, etc."
              rows={compact ? 3 : 4}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-5"
          >
            {isSubmitting ? 'Submitting...' : 'Get Quote'}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
