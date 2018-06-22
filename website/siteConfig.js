/* List of projects/orgs using your project for the users page */
const users = [
  // {
  //   caption: "User1",
  //   image: "/test-site/img/docusaurus.svg",
  //   infoLink: "https://www.facebook.com",
  //   pinned: true
  // }
]

const repoUrl = `https://github.com/userdive/agent.js`
const siteConfig = {
  title: 'USERDIVE',
  tagline: 'Knowing it, makes the world better.',
  url: 'https://developers.userdive.com/',
  baseUrl: '/',
  projectName: 'USERDIVE',
  headerLinks: [
    { doc: 'getting-started', label: 'Usage' },
    { href: repoUrl, label: 'GitHub' },
    { blog: true, label: 'Blog' },
    { search: true }
  ],
  users,
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon/favicon.ico',
  colors: {
    primaryColor: '#272e37',
    secondaryColor: '#232930'
  },
  copyright: 'Copyright © ' + new Date().getFullYear() + ' UNCOVER TRUTH',
  organizationName: 'userdive',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default'
  },
  scripts: [],
  repoUrl,
  twitter: true,
  onPageNav: 'separate',
  usePrism: ['js']
}

module.exports = siteConfig
