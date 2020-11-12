import React from 'react';

function Questions({ questionRandomNum,randomCountry}) {
    return(
        <div>
            {questionRandomNum === 0 ?
             <h3><em>{randomCountry.capital}</em> is the capital of ?</h3>
             :
             (<div>
                <img src={randomCountry.flag} className="flag"/>
                <h2>Which country does this flag belong to?</h2>
            </div>)
            }
        </div>
    )
}

export default Questions;