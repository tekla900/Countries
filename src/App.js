import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, handlesearch }) => {
  return (
    <div>
        filter shown with: <input value={search} onChange={handlesearch} />
      </div>
  )
}

const Content = ({ countriesFilter }) => {
  if (countriesFilter.length === 1) {
    const country = countriesFilter[0]
    // const lang = country['languages'].values()
    return (
      <div>
        <h1>{country['name']['common']}</h1>
        <p>capital {country['capital']}</p>
        <p>area {country['area']}</p>
        <h3>languages:</h3>
      
        <img src={country['flags']['png']} alt={country['name']['common']}></img>
      </div>
    )
  }


  return (
      <ul> {countriesFilter.map(each =>
        <li key={each['ccn3']}>{each['name']['common']}</li>)}
      </ul>
  )
}

const Results = ({ countriesFilter }) => {
  if (countriesFilter.length === 1) {
    const country = countriesFilter[0]
    return (
      <div>
        <h1>{country.name}</h1>
      </div>
    )
  }
  if (countriesFilter.length > 10) return <p>too many</p>
  return countriesFilter.map(country => <li key={country['ccn3']}>{country['name']['common']}</li>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const[search, setNewSearch] = useState('')
  const[countriesFilter, setCountriesFilter] = useState(countries)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data[0]['name']['common'])
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
  // if (countriesFilter.length > 10) {
  //   return (
  //     <div>
  //     <Search search={search} handlesearch={handlesearch} />
  //     <p>{countriesFilter.length}</p>
  //     <p>Too many matches, specify another filter</p>
  //   </div>
  //   )
  // } else if (countriesFilter.length < 10 && countriesFilter.length > 1) {
  //   return (
  //     <div>
  //       <Search search={search} handlesearch={handlesearch} />
  //       <p>{countriesFilter.length}</p>
  //       <Content countriesFilter={countriesFilter} />
  //     </div>
  //   )
  // } 
  return (
    <div>
      <Search search={search} handlesearch={handlesearch} />
      <p>{countriesFilter.length}</p>
      <Content countriesFilter={countriesFilter} />
    </div>
  )
} 


export default App;
