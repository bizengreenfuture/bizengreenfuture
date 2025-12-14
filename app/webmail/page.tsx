import { redirect } from 'next/navigation';

import React from 'react';

async function WebmailRedirect() {
  redirect('http://198.251.84.200:2096');

  // This will never be reached, but TypeScript requires a return statement
  return null;
}

export default WebmailRedirect;