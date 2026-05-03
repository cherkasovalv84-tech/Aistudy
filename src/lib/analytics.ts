export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  console.log(`[Analytics Event]: ${eventName}`, props);
  // In production, this would send data to Mixpanel, PostHog, or GA4
};
