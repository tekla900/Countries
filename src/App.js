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
//searchname == search
//filterperson == handlesearch
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
      <div>
        filter shown with: <input value={search} onChange={handlesearch} />
      </div>
      <ul> {countriesFilter.map(each =>
      <li key={each['ccn3']}>{each['name']['common']}</li>)}
      </ul>
    </div>
  )
} 

export default App;
