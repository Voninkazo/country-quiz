import React from 'react';

function Questions({ randomCountry,numberOfTypesOfQuestion}) {
    return(
        <div>
            {numberOfTypesOfQuestion === 0 ?
            <div>
                 <img src={randomCountry.flag} className="flag"/>
                <h2>Which country does this flag belong to?</h2>
            </div>
            : numberOfTypesOfQuestion === 2 ?
             <h3><em>{randomCountry.capital}</em> is the capital of ?</h3>
             : 
            <h3><em>{randomCountry.region}</em> is the region of ?</h3>
            }
        </div>
    )
}

export default Questions;