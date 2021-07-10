const colors = require('colors');
const menuItems = [
  {
    type: 'list',
    name: 'option',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: 1,
        name: `${colors.yellow(1)} => Buscar ciudad`,
      },
      {
        value: 2,
        name: `${colors.yellow(2)} => Ver historial`,
      },
      {
        value: 0,
        name: `${colors.yellow(0)} => Salir`,
      },
    ],
    placeholder: 'Usa las teclas direcionales',
  },
];
module.exports = { menuItems };
