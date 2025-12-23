'use client';

import { useState } from 'react';
import { Award, FileText, Download, Eye, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CertificateType = 'pdf' | 'image';

interface Certificate {
  id: number;
  name: string;
  file: string;
  description: string;
  type: CertificateType;
}

const certificates: Certificate[] = [
  // PDF Certificates
  {
    id: 1,
    name: 'Certificate of Incorporation (Original)',
    file: '/certificates/1. Certificate of Inco. Orinigal.pdf',
    description: 'Original Certificate of Incorporation for Bizen Green Future Ltd',
    type: 'pdf',
  },
  {
    id: 2,
    name: 'Certificate of Incorporation (New)',
    file: '/certificates/2. Certificate of Inco. New.pdf',
    description: 'Updated Certificate of Incorporation for Bizen Green Future Ltd',
    type: 'pdf',
  },
  {
    id: 3,
    name: 'TIN Certificate',
    file: '/certificates/TIN CERTIFICATE.pdf',
    description: 'Tax Identification Number Certificate',
    type: 'pdf',
  },
  {
    id: 4,
    name: 'Exclusive Distributor Rights',
    file: '/certificates/Exclusive Distributor Right.pdf',
    description: 'Exclusive Distributor Rights Agreement',
    type: 'pdf',
  },
  {
    id: 5,
    name: 'Makerere University Partnership',
    file: '/certificates/Makerere University.pdf',
    description: 'Partnership Certificate with Makerere University',
    type: 'pdf',
  },
  // Image Certificates
  {
    id: 6,
    name: 'ISO 9001:2015 Certification',
    file: '/certificates/iso-9001-2015.png',
    description: 'Quality Management System Certification - ISO 9001:2015',
    type: 'image',
  },
  {
    id: 7,
    name: 'Italian Patent Certificate',
    file: '/certificates/italian-patent.png',
    description: 'Italian Industrial Invention Patent for Supertech Technology',
    type: 'image',
  },
  {
    id: 8,
    name: 'Ministry of Works & Transport',
    file: '/certificates/brazilian-patent.png',
    description: 'Ministry of Works and Transport approval and meeting invitation for Supertech Technology',
    type: 'image',
  },
  {
    id: 9,
    name: 'Uganda Energy Ministry Approval',
    file: '/certificates/uganda-energy-approval.png',
    description: 'Ministry of Energy and Mineral Development approval for Supertech Device use in PMS and AGO fuels',
    type: 'image',
  },
];

export default function CertificationsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs for depth */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg animate-fade-in-up">
              <Award className="h-4 w-4" />
              <span>Our Certifications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Certifications & Credentials
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up animation-delay-400">
              View our official certifications and credentials that demonstrate our commitment to excellence and compliance
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-emerald-50 to-green-50">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="group relative bg-white border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 shadow-lg hover:shadow-emerald-200/20 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                <CardContent className="relative p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-400/40 group-hover:scale-110 transition-transform duration-300">
                    {certificate.type === 'pdf' ? (
                      <FileText className="h-8 w-8 text-white" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-white" />
                    )}
                  </div>

                  {/* Preview Image for image certificates */}
                  {certificate.type === 'image' && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border-2 border-emerald-100 bg-gray-50">
                      <Image
                        src={certificate.file}
                        alt={certificate.name}
                        fill
                        className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(certificate.file)}
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {certificate.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {certificate.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {certificate.type === 'pdf' ? (
                      <>
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                        >
                          <a
                            href={certificate.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View PDF
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <a
                            href={certificate.file}
                            download
                            className="flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setSelectedImage(certificate.file)}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Image
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <a
                            href={certificate.file}
                            download
                            className="flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Image Viewer Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-0 flex flex-col">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-xl font-bold">
                {certificates.find((c) => c.file === selectedImage)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="relative flex-1 p-6 overflow-auto bg-gray-50">
              {selectedImage && (
                <div className="relative w-full min-h-[600px] flex items-center justify-center">
                  <Image
                    src={selectedImage}
                    alt={certificates.find((c) => c.file === selectedImage)?.name || 'Certificate'}
                    width={1200}
                    height={1600}
                    className="object-contain max-w-full max-h-[80vh] w-auto h-auto"
                    quality={100}
                    priority
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}

