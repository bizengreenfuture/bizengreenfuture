import { redirect } from 'next/navigation';

import React from 'react';

async function CpanelRedirect() {
  redirect('https://68.66.220.30/cpanel');

  // This will never be reached, but TypeScript requires a return statement
  return null;
}

export default CpanelRedirect;