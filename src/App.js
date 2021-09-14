import React from "react";
import "./App.css";
import Form from "./components/form.component";
import Weather from "./components/weather.component";
import Wind from "./components/wind.component"
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";

const apiKey= process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      wind_speed: undefined,
      wind_direction: undefined,
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId<= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
        case rangeId >= 300 && rangeId<= 321:
          this.setState({icon: this.weatherIcon.Drizzle});
          break;
        case rangeId >= 500 && rangeId<= 532:
          this.setState({icon: this.weatherIcon.Rain});
          break;
        case rangeId >= 600 && rangeId<= 622:
          this.setState({icon: this.weatherIcon.Snow});
          break;
        case rangeId >= 701 && rangeId<= 781:
          this.setState({icon: this.weatherIcon.Atmosphere});
          break;
        case rangeId === 800:
          this.setState({icon: this.weatherIcon.Clear});
          break;
        case rangeId >= 801 && rangeId<= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
        default:
          this.setState({icon: this.weatherIcon.Clouds});    
    }
  }

  getWeather = async(e) => {
    
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=FR&appid=${apiKey}`);
      
      const response = await api_call.json();

      this.setState({
        city: response.name, 
        country: response.sys.country,
        celsius: response.main.temp_celsisus,
        temp_feels_like: response.main.feels_like,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        description: response.weather[0].description,
        wind_speed: response.wind.speed,
        wind_direction: response.wind.deg,
        icon: this.weatherIcon.Thunderstorm,
        error: false
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    }
    else {
      this.setState({error: true})
    }
  
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
          city={this.state.city} 
          weatherIcon={this.state.icon}
          country={this.state.country} 
          temp_celsisus = {this.state.temp_celsisus}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          temp_feels_like={this.state.temp_feels_like}
          description={this.state.description}  
        />
        <Wind 
          wind_speed={this.state.wind_speed}
          wind_direction={this.state.wind_deg}
        />
      </div>
    );
  }
}

export default App