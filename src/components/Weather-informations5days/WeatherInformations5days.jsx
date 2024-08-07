import './Weatherinformations5days.css';

function WeatherInformations5days({ weather5days }) {
  let dailyForecast = {};

  for (let forecast of weather5days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' });
    return newDate;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='weather-container'>
      <h3> Confira a previsão para os próximos 5 Dias </h3>
      <div className='weather-list'>
        {next5DaysForecast.map(forecast => (

          <div key={forecast.dt} className='weather-item'>

            <p className='forecast-day'>{convertDate(forecast)}</p>
            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="weather-icon" />
            <p className='forecast-description'> {capitalizeFirstLetter(forecast.weather[0].description)}</p>
            <p>
              {Math.round(forecast.main.temp_min)}ºC min / {Math.round(forecast.main.temp_max)}ºC máx
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5days;
