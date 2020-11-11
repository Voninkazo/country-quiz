import React from 'react';
import Popup from '../pages/Popup';

function NextButton({clickNext,isCorrect, getRandomCountry,score,showPopup,fetchCountries}) {
    return (
        <div>
            <button type="button" onClick={clickNext} className="btn-next">Next</button>
        {isCorrect === true ?
        getRandomCountry : ''}
    
        {showPopup ?
            <Popup
            score={score}
            fetchCountries={fetchCountries}
             />
             : ""
        }
        </div>
    )
}

export default NextButton;