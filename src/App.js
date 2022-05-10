import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, handlesearch }) => {
  return (
    <div>
        filter shown with: <input value={search} onChange={handlesearch} />
      </div>
  )
}

const Language = ({ country }) => {
  const langs = Object.values(country['languages'])
  return (
    <ul>
    {langs.map((each) => <li key={each}>{each}</li>)}
    </ul>
    )
    
}

const Content = ({ countriesFilter, handlesearch }) => {
  if (countriesFilter.length === 1) {
    const country = countriesFilter[0]
    // console.log(country['capital'][0]);
    return (
      <div>
        <h1>{country['name']['common']}</h1>
        <p>capital {country['capital']}</p>
        <p>area {country['area']}</p>
        {/* <Weather country={country['capital'][0]} /> */}
        <Weather country={country} />
        <h3>languages:</h3>
        <Language country={country} />
        <img src={country['flags']['png']} alt={country['name']['common']}></img>
      </div>
    )
  }

  return (
      <ul> {countriesFilter.map(each =>
        <li key={each['name']['common']}>{
        each['name']['common']}  
        <button value={each['name']['common']} onClick={handlesearch}>show</button>
        </li>)}
      </ul>
  )

}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])
  const [wind, setWind] = useState([])
  const [iconImg, setImg] = useState([])
  const capital = country['capital'][0] 
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  
  const weather_hook = () => {
    axios
    .get(url)
      .then(response => {
        setImg(response.data['weather'][0]['icon'])
        setWeather(response.data['main']['temp'])
        setWind(response.data['wind']['speed'])
      })
  }
  
  useEffect(weather_hook, [])
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature is {weather} Celsius</p>
      <p>wind {wind} m/s</p>
      <img src={`http://openweathermap.org/img/wn/${iconImg}@2x.png`} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const[search, setNewSearch] = useState('')
  const[countriesFilter, setCountriesFilter] = useState(countries)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handlesearch = (event) => {
    const searchCountry = event.target.value.toLowerCase()
    setNewSearch(searchCountry)
    const newCountries = countries.filter (
      (country) => 
      country['name']['common'].toLowerCase().search(searchCountry) !== -1
    )
    setCountriesFilter(newCountries)
  }
  

  return (
    <div>
      <Search search={search} handlesearch={handlesearch} />
      <Content countriesFilter={countriesFilter} handlesearch={handlesearch}/>
    </div>
  )
} 

export default App;
