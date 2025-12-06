import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon | Bizen Green Future Ltd',
  description: 'Something amazing is coming! Bizen Green Future Ltd - Pioneering sustainability in Uganda through clean energy, regenerative agriculture, and circular innovation.',
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

