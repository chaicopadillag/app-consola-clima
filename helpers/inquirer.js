const inquirer = require('inquirer');
const colors = require('colors');
const { menuItems } = require('../data/menuItems');

const menuOpstionsInquirer = async () => {
  console.clear();
  let title = `============================\n---Seleccione una opción---\n============================\n`;
  console.log(colors.blue(title));
  const { option } = await inquirer.prompt(menuItems);
  return option;
};

const listarLugares = async (lugares = []) => {
  console.clear();
  const choices = lugares.map((lugar, index) => ({
    value: lugar.id,
    name: `${colors.green(index + 1)}.- ${colors.yellow(lugar.name)}`,
  }));

  choices.unshift({
    value: 0,
    name: `${colors.green(0)}.- ${colors.red('Cancelar')}`,
  });

  const itemsTodo = {
    type: 'list',
    name: 'id',
    message: 'Seleccione un lugar',
    choices,
  };
  const { id } = await inquirer.prompt(itemsTodo);

  return id;
};

const marcarTareasCompletadas = async (tareas = []) => {
  console.clear();
  const choices = tareas.map((choice, index) => ({
    value: choice.id,
    name: `${colors.green(index + 1)}.- ${colors.yellow(choice.name)}`,
    checked: choice.complete !== null ? true : false,
  }));

  const itemsTodo = {
    type: 'checkbox',
    name: 'tareasCompleted',
    message: 'Seleccione una tarea para completar',
    choices,
  };
  const { tareasCompleted } = await inquirer.prompt(itemsTodo);

  return tareasCompleted;
};

const confirmDelete = async (message) => {
  console.clear();
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message,
    },
  ]);

  return confirm;
};

const pauseInquirer = async () => {
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${colors.bold.green('ENTER')} para continuar...`,
    },
  ]);
};

const leerInput = async (message) => {
  const { tarea } = await inquirer.prompt([
    {
      type: 'input',
      name: 'tarea',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por ingrese una descripción';
        }
        return true;
      },
    },
  ]);

  return tarea;
};

module.exports = { menuOpstionsInquirer, pauseInquirer, leerInput, listarLugares, confirmDelete, marcarTareasCompletadas };
