import { redirect } from 'next/navigation';

import React from 'react';

async function CpanelRedirect() {
  redirect('http://198.251.84.200:2082');

  // This will never be reached, but TypeScript requires a return statement
  return null;
}

export default CpanelRedirect;