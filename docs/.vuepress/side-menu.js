const sideMenuObj = require('../side-menu.json');
let sideMenu = [];


/*
// original side menu object

{
  suttas: [
    { title: 'DN', path: '/dn/' },
    { title: 'DN1', path: '/dn1/' },
    { title: 'DN2', path: '/dn2/' }
  ],
  title: 'Side Menu'
}

*/

sideMenu = sideMenuObj.suttas.map(function(sutta, i){
  return [sutta.path, sutta.title];
})

/*
// transformed side menu array

[
  ['/dn/', 'DN'],
  ['/dn1/', 'DN1'],
  ['/dn2/', 'DN2'],
]

*/

module.exports = sideMenu;