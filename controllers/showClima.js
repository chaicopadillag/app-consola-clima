const colors = require('colors');
const showClimaCiudad = (ciudad) => {
  let infoCiudad = `
${colors.bold.red('IFORMACIÓN DE LA CIUDAD')}

Ciudad: ${colors.green(ciudad.name)}
Lat: ${colors.yellow(ciudad.lat)}
Lng: ${colors.yellow(ciudad.lng)}
Temperatura: ${colors.blue(ciudad.temp)}
Mínima: ${ciudad.min}
Máxima: ${ciudad.max}
La Clima esta: ${ciudad.descripcion}
`;
  console.log(infoCiudad);
};

module.exports = { showClimaCiudad };
