import React from 'react';

function Questions({ questionRandomNum,randomContry}) {
    return(
        <div>
            {questionRandomNum === 0 ?
             <h3>{randomContry.capital} is the capital of ?</h3>
             :
             (<div>
                <img src={randomContry.flag} className="flag"/>
                <h2>Which country does this flag belong to?</h2>
            </div>)
            }
        </div>
    )
}

export default Questions;