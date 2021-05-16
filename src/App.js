
import './App.css';
import React, { useState } from 'react';

//const API_KEY = process.env.REACT_APP_API_KEY
const api = {
  key: "your api key here",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
const [query,setQuery] = useState('');
const [weather,setWeather] = useState({});

//fetch request
const search = evt =>{
  if(evt.key ==="Enter"){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res =>res.json())//getting json 
    .then(result => {
      setWeather(result); 
      setQuery('');
      console.log(result);//console logging to view returned weather object in json
    }); //setting weather to the result
  }
}


  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()]; //gets number between 0 and 6
let date = d.getDate();
let month = months[d.getMonth()];

let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app' ) : 'app'}>
      <main>
        <div className = "search-box">
          <input 
          type = "text" 
          className = "search-bar"
           placeholder = "Search For City" 
           onChange= {e => setQuery(e.target.value)}
           onKeyPress={search}
           />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
                <div className ="location-box">
                <div className = "location"> {weather.name}, {weather.sys.country}</div>
                <div className = "date">{dateBuilder(new Date())}</div>
          </div>
                <div className ="weather-box">
                <div className="temperature">{Math.round(weather.main.temp)}°C</div>
                <div className = "weather">{weather.weather[0].main}</div>
                <div className = "minimum">Minimum: {Math.round(weather.main.temp_min)}°C</div>
                <div className = "maximum">Maximum: {Math.round(weather.main.temp_max)}°C</div>
                <div className = "humidity">Humidity:  {Math.round(weather.main.humidity)}%</div>
                <div className = "feelslike">Feels like:  {Math.round(weather.main.feels_like)}°C</div>
          </div>
          </div>
        ) : ('')}
    

      </main>
    </div>
  );
}

export default App;
