import React from 'react';

function Questions({ questionRandomNum,randomCountry}) {
    return(
        <div>
            {questionRandomNum === 0 ?
            <div>
                <img src={randomCountry.flag} className="flag"/>
            <h2>Which country does this flag belong to?</h2>
         </div>
             :
             <h3><em>{randomCountry.capital}</em> is the capital of ?</h3>
            }
        </div>
    )
}

export default Questions;