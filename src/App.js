import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, handlesearch }) => {
  return (
    <div>
        filter shown with: <input value={search} onChange={handlesearch} />
      </div>
  )
}

const Content = ({ countriesFilter, handlesearch }) => {
  if (countriesFilter.length === 1) {
    const country = countriesFilter[0]
    return (
      <div>
        <h1>{country['name']['common']}</h1>
        <p>capital {country['capital']}</p>
        <p>area {country['area']}</p>
        <h3>languages:</h3>
        {/* <Lang country={country} /> */}
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
      <p>{countriesFilter.length}</p>
      <Content countriesFilter={countriesFilter} handlesearch={handlesearch}/>
    </div>
  )
} 

export default App;