import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/Weather-informations/WeatherInformations'   
import WeatherInformations5days from './components/Weather-informations5days/WeatherInformations5days'

function App() {
  const [weather, setWeather] = useState(null);
  const [weather5days, setWeather5days] = useState(null);

  const inputRef = useRef();

  async function searchCity() {
    console.log(inputRef.current.value);

    const city = inputRef.current.value;
    const key = "92437e2e688d0ca13b9d97cfd8c82495";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5days = await axios.get(url5days);

      setWeather(apiInfo.data);
      setWeather5days(apiInfo5days.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5days && <WeatherInformations5days weather5days={weather5days} />}
    </div>
  );
}

export default App;







//API KEY weather
// 92437e2e688d0ca13b9d97cfd8c82495
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}