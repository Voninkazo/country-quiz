import React, { useEffect, useState } from 'react';


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
        <div className="quiz-container">
            <p className="question-quiz"> <em>{countries[firstRandomNum].capital}</em> is the capital of ?</p>
            <div>
                {randomNumberArr.map(country => (
                <div className="btn-container" key={countries[country].name}>
                    <button type="button" className="btn-country" value={countries[randomNumberArr[1]].name}>
                        {countries[country].name}
                    </button>
                </div>
      ))}
            </div>
        </div>
    )
}

export default App;