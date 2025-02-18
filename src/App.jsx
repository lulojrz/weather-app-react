import { useState } from "react";
import "./App.css";

function App() {
  const [ciudad,setCiudad] = useState("");
  const [dataclima, Setdataclima] = useState({})
  const url = `https://api.openweathermap.org/data/2.5/weather`
  const getWeatherData =  async (ciudad) => {
    try {
      const response = await fetch(`${url}?q=${ciudad}&appid=9a03ba676c3d84cee2b1bfae6a8bcfd2`)
      const data =  await response.json();
      if (data.cod !== 200) {
        alert("Ciudad no encontrada");
      } else {
        Setdataclima(data);
      }
      console.log(data)
      
    } catch (error) {
       console.log(error)
    }

  }
  const handleChange = (e) =>{
    setCiudad(e.target.value)
   
  } 

  const handleSubmit = (e)=>{
    e.preventDefault();
    getWeatherData(ciudad)
    
  }
  return (
    <div className="container">
      <h2 className="title">Weather APP</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter City Name"
          className="input"
          value={ciudad}
          onChange={handleChange}

         
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
     {dataclima &&  ( 
      <div className="card" style={{width:"50%", margin:"auto", marginTop : "30px"}}>
      <div className="card-body">
        <h5 className="card-title">{dataclima.name}({dataclima.sys.country})</h5>
        <img src={`https://openweathermap.org/img/wn/${dataclima.weather[0].icon}@2x.png`} alt="" />
        <h6 className="card-subtitle mb-2 text-body-secondary">Temperature</h6> 
        <p className="card-text">{parseInt(dataclima.temp - 273.15)}°C</p>
        
      </div>
    </div>
     )}
    </div>
  );
}

export default App;
