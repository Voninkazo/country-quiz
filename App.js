import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


function App() {
    const [countries,setCountries] = useState([]);

    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        console.log(data);
    }


    useEffect(() => {
        fetchCountries();
    }, [])
    if (!countries.length) return null
    const firstRandomNum = Math.floor(Math.random() * countries.length)
    const secondRandomNum = Math.floor(Math.random() * countries.length)
    const thirdRandomNum = Math.floor(Math.random() * countries.length)
    const fourthRandomNum = Math.floor(Math.random() * countries.length)
    const randomNumberArr = [firstRandomNum, secondRandomNum, thirdRandomNum, fourthRandomNum]

    return (
        <div>
            <h1>Country quiz</h1>
            <p>What is the capital of {countries[firstRandomNum].name}?</p>
            <div>
            {randomNumberArr.map(country => (
            <Link 
                    to={`/capital/${countries[firstRandomNum].capital}`} 
                    key={countries[country].name}>
                    <button type="button" value={countries[randomNumberArr[1]].name}>
                        {countries[country].name}
            </button>
            </Link>
      ))}
            </div>
        </div>
    )
}

export default App;