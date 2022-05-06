import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  // const handlesearch = (event) => {
  //   const searchCountry = event.target.value.toLowerCase()
  //   setNewSearch(searchCountry)
  //   const newCountries = countries.filter (
  //     (country) => 
  //     country.name.toLowerCase().search(searchCountry) !== -1
  //   )
  //   setCountriesFilter(newCountries)
  // }
  
  return (
    <div>
      {/* <p>find countries: <input value={search} onChange={handlesearch}/></p> */}
      <ul> {countries.map(each =>
      <li>{each['name']['common']}</li>)
        }
       
        {/* <li>
          {countriesFilter.map(country =>
            <li> country={country} </li>)}
        </li> */}
      </ul>
    </div>
  )
} 

export default App;
