/* List of projects/orgs using your project for the users page */
const users = [
  // {
  //   caption: "User1",
  //   image: "/test-site/img/docusaurus.svg",
  //   infoLink: "https://www.facebook.com",
  //   pinned: true
  // }
]

const siteConfig = {
  title: 'USERDIVE',
  tagline: '',
  url: 'https://userdive.github.io/agent.js/',
  baseUrl: '/agent.js/',
  projectName: 'USERDIVE',
  headerLinks: [
    // {doc: 'doc1', label: 'Docs'},
    // {doc: 'doc4', label: 'API'},
    // {page: 'help', label: 'Help'},
    { blog: true, label: 'Blog' }
  ],
  users,
  headerIcon: 'img/logo_horizontal_white.png',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon.png',
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
  scripts: ['https://cdn.userdive.com/agent.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/userdive/agent.js'
}

module.exports = siteConfig
