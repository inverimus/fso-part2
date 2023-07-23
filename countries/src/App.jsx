import { useState, useEffect } from 'react'
import CountryService from './services/Countries'

const Countries = ({ countries, search }) => {
  const list = countries.filter((country) => 
    country.name.official.toLowerCase().includes(search.toLowerCase()) ||
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  if (search == '') {
    return (
      <div></div>
    )
  }
  if (list.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (list.length != 1) {
    return (
      <div>{list.map((country) => <div>{country.name.official}</div>)}</div>
    )
  }
  return (
    <Country country={list[0]} />
  )
}

const Country = ({ country }) => {

  const languages = Object.values(country.languages)
  console.log(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>{country.capital[0]}</div>
      <div>area {country.area}</div>
      <p><b>languages:</b></p>
      {languages.map((lang) => <li>{lang}</li>)}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountryService
      .getAll()
      .then(response => {setCountries(response.data)})
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: <input search={search} onChange={handleSearch}/>
      </form>
      <Countries countries={countries} search={search} />
    </div>
  )
}

export default App