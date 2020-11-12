import React from 'react';

function NextButton({handleClickNext,isCorrect, getRandomCountry}) {
    return (
        <div className="next-btn-container">
            <button type="button" onClick={handleClickNext} className="btn-next">Next</button>
        {isCorrect === true &&
        getRandomCountry }
        </div>
    )
}

export default NextButton;