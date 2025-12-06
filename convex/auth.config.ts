import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Uses the CLERK_JWT_ISSUER_DOMAIN environment variable
      // Configure this on the Convex Dashboard: https://dashboard.convex.dev
      // Value should be: https://fitting-anteater-71.clerk.accounts.dev
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;
