const colors = require('colors');
const { showClimaCiudad } = require('./controllers/showClima');
const { menuOpstionsInquirer, pauseInquirer, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
  let opt;
  const busqueda = new Busquedas();
  busqueda.getAllHistory();
  do {
    opt = await menuOpstionsInquirer();

    switch (opt) {
      case 1:
        const lugar = await leerInput('Buscar ciudad:');
        console.clear();
        console.log('Espere por favor...');
        const lugares = await busqueda.ciudad(lugar);
        console.clear();
        console.log('Espere por favor...');
        const lugarIDSelect = await listarLugares(lugares);
        if (lugarIDSelect === 0) continue;
        const lugarSelected = lugares.find((l) => l.id === lugarIDSelect);
        busqueda.addHistory(lugarSelected.name);
        console.clear();
        console.log('Espere por favor...');
        const climaLugar = await busqueda.climaPorLugar(lugarSelected.lat, lugarSelected.lng);
        console.clear();
        showClimaCiudad({ ...lugarSelected, ...climaLugar });
        break;
      case 2:
        busqueda.historial.forEach((item, index) => {
          console.log(`${colors.green(index + 1 + '.-')} ${item}`);
        });
        break;
      case 3:
        console.log(opt);
        break;
    }
    if (opt !== 0) await pauseInquirer();
  } while (opt !== 0);
};

main();
