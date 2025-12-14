'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// Get the app URL for email links
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createContact = useMutation(api.contacts.create);
  const createNotification = useMutation(api.notifications.createForRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save contact to database
      await createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });

      // 2. Create in-app notification for admins
      await createNotification({
        type: 'contact_new',
        title: 'New Contact Submission',
        message: `${formData.name} sent a message: "${formData.message.substring(0, 50)}${formData.message.length > 50 ? '...' : ''}"`,
        link: '/admin/contacts',
        role: 'admin',
      });

      // 3. Send email notifications (non-blocking)
      sendEmailNotifications({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send email notifications in the background
  const sendEmailNotifications = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      // Send notification to admins
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new_contact',
          to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'info@bizengreenfuture.com'],
          data: {
            contactName: data.name,
            contactEmail: data.email,
            contactPhone: data.phone || undefined,
            message: data.message,
            submittedAt: new Date().toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }),
            adminDashboardUrl: `${APP_URL}/admin/contacts`,
          },
        }),
      });

      // Send auto-reply to the contact
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_response',
          to: data.email,
          data: {
            contactName: data.name,
          },
        }),
      });
    } catch (error) {
      // Don't show error to user - emails are non-critical
      console.error('Failed to send email notifications:', error);
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

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-700/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Ready to join the green revolution? Contact us to learn more about our
            solutions and how we can help transform your business or farm.
          </p>
        </div>

        {/* Contact Form - Now First */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl blur opacity-20" />
            <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 shadow-xl shadow-emerald-600/10">
              <CardContent className="p-8 md:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/40">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-gray-300 mb-8 text-lg">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 hover:text-emerald-300 px-8 py-6 text-lg"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-base font-semibold text-white mb-3"
                      >
                        Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full h-12 bg-gray-900/50 border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-base font-semibold text-white mb-3"
                        >
                          Email Address <span className="text-emerald-400">*</span>
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full h-12 bg-gray-900/50 border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-base font-semibold text-white mb-3"
                        >
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+256 7XX XXX XXX"
                          className="w-full h-12 bg-gray-900/50 border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-base font-semibold text-white mb-3"
                      >
                        Message <span className="text-emerald-400">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your sustainability needs, questions, or how we can help..."
                        rows={6}
                        required
                        className="w-full bg-gray-900/50 border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-6 text-lg font-semibold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Cards - Now Second */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-600/20 h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/40">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Our Location
                </h3>
                <p className="text-gray-300 leading-relaxed">Kampala, Uganda<br />Rubaga Road Opposite Red Cross</p>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-600/20 h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/40">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Call Us
                </h3>
                <div className="text-gray-300 space-y-2">
                  <a href="tel:+256752460012" className="block hover:text-emerald-400 transition-colors">+256 752 460 012</a>
                  <a href="tel:+256783844158" className="block hover:text-emerald-400 transition-colors">+256 783 844 158</a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-600/20 h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/40">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Email Us
                </h3>
                <a href="mailto:info@bizengreenfuture.com" className="text-gray-300 hover:text-emerald-400 transition-colors break-all">info@bizengreenfuture.com</a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Us
              </h3>
              <p className="text-gray-300 text-lg">
                Visit us at our location in Kampala, Uganda
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-600/30 shadow-xl shadow-emerald-600/10">
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=en&amp;q=Rubaga%20Road%20Opposite%20Red%20Cross,%20Kampala,%20Uganda+(Bizen%20Green%20Future)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Bizen Green Future Location - Rubaga Road Opposite Red Cross, Kampala, Uganda"
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rubaga+Road+Opposite+Red+Cross,+Kampala,+Uganda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MapPin className="h-5 w-5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-600/20 border border-emerald-600/30 backdrop-blur-sm text-emerald-400 px-6 py-3 rounded-full text-sm font-medium">
            <span>Better Profit. Better Planet.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
