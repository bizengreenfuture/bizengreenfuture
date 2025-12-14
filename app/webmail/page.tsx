import { redirect } from 'next/navigation';

import React from 'react';

async function WebmailRedirect() {
  redirect('https://68.66.220.30/webmail');

  // This will never be reached, but TypeScript requires a return statement
  return null;
}

export default WebmailRedirect;