import React from 'react';

function NextButton({clickNext,isCorrect, getRandomCountry}) {
    return (
        <div>
            <button type="button" onClick={clickNext} className="btn-next">Next</button>
        {isCorrect === true &&
        getRandomCountry }
        </div>
    )
}

export default NextButton;