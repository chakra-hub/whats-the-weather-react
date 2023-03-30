import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('Mumbai');
  const [main_weather_data, setMainWeatherData] = useState({});
  const [all_weather_data, setAllWeatherData] = useState({});
  const [country, setcountry] = useState('');
  const [weather_state, setWeatherState] = useState('');

  const [input, setInput] = useState('');

  let date = new Date();

  const fetchData=async ()=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2b29329a1244d63c803ce49dcbc3c85f`)
    let data = await response.json()
    if(data.message){
      setMainWeatherData('');
      setAllWeatherData('');
      setcountry('');
    }
    else{
      setMainWeatherData(data.main);
    setAllWeatherData(data);
    setcountry(data.sys.country)
    setWeatherState(data.weather[0].main)
    }
    
    
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[search])

  const handleSearch=(event)=>{
    event.preventDefault(); 
    if(input.length>20){
      setSearch(input.slice(0,20)+'...');
    }
    else{
      setSearch(input);
    }
    setInput('');
  }
  return (
    <div className="App">
      <div className="container">
      <div className="search_container">
        <h1>What'sTheWeather</h1>
        <form className='search_form' onSubmit={handleSearch}>
          <input className="searchbox" type="search"  value={input} onChange={(event)=>setInput(event.target.value)}/>
        </form>
      </div>
      {all_weather_data?<div className="result">
      <div className="left">
        <div className="location">
          <div className="city">{all_weather_data.name}</div>
          <div className="country">{country}</div>
        </div>
        <div className="date_time_weather">
          <div className="date_time">
            <div className="time">{date.toLocaleTimeString().slice(0,4)}</div>
            <div className="date">{date.toLocaleDateString()}</div>
          </div>
          <div className="temp">
            {Math.ceil(main_weather_data.temp-273.15)}&#8451;
          </div>
        </div>
      </div>
      <div className="right">
        {weather_state=='Smoke' && <><img className="weather_icon" src="https://cdn-icons-png.flaticon.com/512/182/182266.png"/></>}
        {weather_state=='Clear' && <><img className="weather_icon" src="https://www.shareicon.net/data/2016/08/07/808329_star_512x512.png"/></>}
        {weather_state=='Clouds' && <><img className="weather_icon"   src="https://icon-library.com/images/raincloud-icon/raincloud-icon-28.jpg"/></>}
        {weather_state=='Haze' && <><img className="weather_icon" src="https://icons.veryicon.com/png/o/weather/weather-5/haze-1.png"/></>}
        {weather_state=='Rain' && <><img className="weather_icon" src="https://cdn-icons-png.flaticon.com/512/263/263832.png"/></>}

        <div className="weather_status">{weather_state}</div>
        <ul className="weather_details">
          <li className="weather_itme">Max Temp : <span className='weather_values'>{Math.ceil(main_weather_data.temp_max-273.15)}&#8451;</span> </li>
          <li className="weather_itme">Min Temp : <span className='weather_values'>{Math.ceil(main_weather_data.temp_min-273.15)}&#8451;</span></li>
          <li className="weather_itme">Feels Like : <span className='weather_values'>{Math.ceil(main_weather_data.feels_like-273.15)}&#8451;</span></li>
          <li className="weather_itme">Humidity : <span className='weather_values'>{main_weather_data.humidity} %</span></li>
        </ul>
      </div></div>
      :<><div className="notfound">
        <div className="noresult">
          No Result Found for : {search}
        </div>
        </div></>}
      
      </div>
      <div className="project_details">
        <div className="details">
          Developed by <a href="google.com" target='_blank'>Chakradhar Pradhan</a> | Download <a href="google.com" target='_blank'>Source Code</a>
        </div>
      </div>
    </div>
  );
}

export default App;
