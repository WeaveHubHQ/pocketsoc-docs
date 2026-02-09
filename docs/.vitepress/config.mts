import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PocketSOC Docs',
  description: 'Product documentation for PocketSOC — mobile security operations for your team.',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.png' }],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Portal', link: '/portal/' },
      { text: 'iOS App', link: '/ios-app/' },
      { text: 'Vendor Setup', link: '/vendor-setup/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'What is PocketSOC?', link: '/getting-started' },
          { text: 'Quick Start', link: '/quick-start' },
          { text: 'Plans & Pricing', link: '/plans' },
        ],
      },
      {
        text: 'Portal',
        items: [
          { text: 'Overview', link: '/portal/' },
          { text: 'Sign In', link: '/portal/sign-in' },
          { text: 'Organization Settings', link: '/portal/organization' },
          { text: 'Team Management', link: '/portal/team' },
          { text: 'Groups', link: '/portal/groups' },
          { text: 'Devices', link: '/portal/devices' },
          { text: 'Billing', link: '/portal/billing' },
          { text: 'Audit Log', link: '/portal/audit-log' },
        ],
      },
      {
        text: 'Vendor Setup',
        items: [
          { text: 'Overview', link: '/vendor-setup/' },
          { text: 'CrowdStrike', link: '/vendor-setup/crowdstrike' },
          { text: 'Microsoft Defender', link: '/vendor-setup/defender' },
        ],
      },
      {
        text: 'iOS App',
        items: [
          { text: 'Overview', link: '/ios-app/' },
          { text: 'Signing In', link: '/ios-app/signing-in' },
          { text: 'Detections', link: '/ios-app/detections' },
          { text: 'Process Graph', link: '/ios-app/process-graph' },
          { text: 'Profiles', link: '/ios-app/profiles' },
          { text: 'Settings', link: '/ios-app/settings' },
          { text: 'Push Notifications', link: '/ios-app/push-notifications' },
        ],
      },
      {
        text: 'Security',
        items: [
          { text: 'Security & Privacy', link: '/security' },
          { text: 'MDM Deployment', link: '/mdm' },
        ],
      },
      {
        text: 'Troubleshooting',
        items: [
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pocketsoc' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'PocketSOC Documentation',
      copyright: 'Copyright 2025-2026 PocketSOC',
    },
  },
})
