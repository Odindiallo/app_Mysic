export const siteConfig = {
  name: 'Muisique',
  description: 'Light Up Their World with a Custom Song, Where Every Note Is Crafted Just for Them...',
  mainNav: [
    {
      title: 'How It Works',
      href: '/#how-it-works',
    },
    {
      title: 'Sample Songs',
      href: '/#sample-songs',
    },
    {
      title: 'Testimonials',
      href: '/#testimonials',
    },
    {
      title: 'FAQ',
      href: '/#faq',
    },
    {
      title: 'Contact',
      href: '/#contact',
    },
  ],
  links: {
    twitter: 'https://twitter.com/muisique',
    github: 'https://github.com/muisique',
    facebook: 'https://facebook.com/muisique',
  },
}

export type SiteConfig = typeof siteConfig;
