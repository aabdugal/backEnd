import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Country = (props) =>{
  var filteredCountries = props.countries

  if(props.filter){
    filteredCountries=filteredCountries.filter(country=>country.name.toLowerCase().includes(props.filter.toLowerCase()))
  }
  const disp = () =>{
    return (filteredCountries.map(country=>
    <>
    <li key = {country.name}>{country.name} <button onClick = {props.buttonClick} country={country.name} >show</button> </li>
    </>
   ))
  }

  if(filteredCountries.length>10){
    return(
    <p>Too many matches, specify another filter</p>)
  }

  if(filteredCountries.length===1){
    const oneCountry = filteredCountries[0]
    return(
      <div>
        <h2>{oneCountry.name}</h2>
        <p> Capital {oneCountry.capital}</p>
        <p> Population {oneCountry.population}</p>
        <h3>Languages</h3>
        <ul>
          {oneCountry.languages.map(lang=>
            <>
            <li key = {lang.name}>{lang.name}</li>
            </>)}
        </ul>
        <div><img src = {oneCountry.flag} alt ={oneCountry.name} width = "150" height = "150"/></div>
      </div>
    )
  }

  return (
    <ul>{disp()}</ul>
  )
}

// const Display = (props) =>{

//     const oneCountry = filteredCountries[0]
//     return(
//       <div>
//         <h2>{oneCountry.name}</h2>
//         <p> Capital {oneCountry.capital}</p>
//         <p> Population {oneCountry.population}</p>
//         <h3>Languages</h3>
//         <ul>
//           {oneCountry.languages.map(lang=>
//             <>
//             <li key = {lang.name}>{lang.name}</li>
//             </>)}
//         </ul>
//         <div><img src = {oneCountry.flag} alt ={oneCountry.name} width = "150" height = "150"/></div>
//       </div>
//     )
// }

const Weather = ({})=>{
  const [weather, setWeather] = useState([])
  useEffect(()=>{
    axios.get('http://api.weatherstack.com/current ? access_key=d21d6784b7089e07a45be449d259756f & query = New York').then(response=>{
      setWeather(response.data)
      console.log(response.data)
    })
  })
}

const App = () => {
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(()=>{
    axios.get('https://community-open-weather-map.p.rapidapi.com/weather').then(response=>{
      setWeather(response.data)
      console.log(response.data)
    })
  })






  useEffect(()=>{
      axios.get('https://restcountries.eu/rest/v2/all').then(response=>{
          setCountry(response.data)
          console.log(response.data[0])
      })
  },[])
  const handleChange = (event) => {
      event.preventDefault()
      setFilter(event.target.value)
      // console.log(country);
  }
  const buttonClick = (event) => {
      // console.log(event.target)
      // console.log('ATTRIBUTES', event.target.attributes)
      // setFilter(event.target.attributes.country)
      // event.preventDefault()
      console.log(event.target.attributes.country.value)
      setFilter(event.target.attributes.country.value)

  }

 

  return (
      <div>
          <input
              onChange={handleChange}
              value={filter}
              
          />
          <div>
          <Country countries={country} filter={filter} buttonClick={buttonClick} />
          {/* <Weather /> */}
          </div>
      </div>
  )
}

export default App