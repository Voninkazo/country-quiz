import React from 'react';

function Answers({disbledFieldset,randomOptions,randomCountry,checkAnswer,correctAnswer}) {
    return(
        <div>
           <fieldset disabled={disbledFieldset}>
                <form onClick={(e) =>checkAnswer(e)} className="btn-container">
                    <button ref={randomOptions[0] === randomCountry.name ? correctAnswer : null} className="btn-country" data-value={randomOptions[0]}>{randomOptions[0]}</button>
                    <button ref={randomOptions[1] === randomCountry.name ? correctAnswer : null} className="btn-country" data-value={randomOptions[1]}>{randomOptions[1]}</button>
                    <button ref={randomOptions[2] === randomCountry.name ? correctAnswer : null} className="btn-country" data-value={randomOptions[2]}>{randomOptions[2]}</button>
                    <button ref={randomOptions[3] === randomCountry.name ? correctAnswer : null} className="btn-country" data-value={randomOptions[3]}>{randomOptions[3]}</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Answers;