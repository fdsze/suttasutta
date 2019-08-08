const toc = {
  dn: [
    ['/dn/', 'DN'],
    ['/dn1/', 'DN1'],
    ['/dn2/', 'DN2']
  ],
  an: [
    ['/an/', 'AN'],
    ['/an1/', 'AN1'],
    ['/an2/', 'AN2']
  ]
}

const sidebar = {}

Object.keys(toc).map(function(tocKey){
  toc[tocKey].map(function(sutta){
    sidebar[sutta[0]] = toc[tocKey];
  })
});

module.exports = sidebar;