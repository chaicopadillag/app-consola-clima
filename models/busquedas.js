const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

class Busquedas {
  constructor(historial = []) {
    this.historial = historial;
    this.pathDB = './data/db.json';
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsWeatherMap() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async ciudad(lugar = '') {
    try {
      const api = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });
      const { data } = await api.get();

      return data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaPorLugar(lat, lng) {
    try {
      const api = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeatherMap, lat, lon: lng },
      });
      const { data } = await api.get();
      const { weather, main } = data;

      return {
        descripcion: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(lugar = '') {
    if (this.historial.includes(lugar.toLocaleUpperCase())) return;
    this.historial.unshift(lugar.toLocaleUpperCase());
    this.historial = this.historial.splice(0, 5);
    this.saveHistorial();
  }

  saveHistorial() {
    fs.writeFileSync(this.pathDB, JSON.stringify({ historial: this.historial }, 0, 2));
  }

  getAllHistory() {
    if (!fs.existsSync(this.pathDB)) return;

    const contentDB = fs.readFileSync(this.pathDB, { encoding: 'utf-8' });
    const data = JSON.parse(contentDB);
    this.historial = data.historial;
  }
}

module.exports = Busquedas;
