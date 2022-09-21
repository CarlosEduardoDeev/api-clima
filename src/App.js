import React, { useState } from "react";

const api = {
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=32b4369e028472e5130ab7740de93d83`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo", "Domingo"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year} `


  }
  return (

    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : 'app bgdefault'}>
      <main>
        <div className="search-box">
          <input
            onChange={e => setQuery(e.target.value)}
            type='text'
            className="search-bar"
            placeholder="Procurar..."
            value={query}
            onKeyPress={search}
          >
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="box-glass">
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
                
              <div className="weather">{weather.weather[0].main}</div>
                
            </div>
            <div className="detalhes">
                    <div className="details">Ventos: {(weather.wind.speed)}KM/H</div>
                    <div className="details">Temp Min: {Math.round(weather.main.temp_min)}°C</div>
                    <div className="details">Temp Max: {Math.round(weather.main.temp_max)}°C</div>
                    <div className="details">Umidade: {Math.round(weather.main.humidity)}</div>
                </div>
            
         </div>
         
        ) : ('')}
      </main>
    </div>
  )
}

export default App;