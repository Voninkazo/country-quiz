import React from 'react';
import AdventureImg from '../undraw_adventure_4hum.svg';

function Questions({ randomCountry,numberOfQuest}) {
    return(
        <div className="content">
            <img src={AdventureImg} alt="img"/>
            {numberOfQuest === 0 ?
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