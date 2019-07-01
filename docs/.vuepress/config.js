const toc = require('./toc.js');

module.exports = {
  dest: 'dist',
  title: 'SUTTA·SUTTA',
  description: 'Compare sutta translations',
  themeConfig: {
    nav: [
      { text: 'DN', link: '/dn/' },
      { text: 'MN', link: '/mn/' },
      { text: 'SN', link: '/sn/' },
      { text: 'AN', link: '/an/' },
    ],
    sidebar: toc,
    sidebarDepth: 2,
    displayAllHeaders: true
  }
}
