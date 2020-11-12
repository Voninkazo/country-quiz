import React from 'react';

function Answers({disbledFieldset,randomAnswerOptions,randomCountry,checkAnswer,correctAnswer}) {
    return(
        <div>
            <form onClick={(e) =>checkAnswer(e)}>
                <fieldset disabled={disbledFieldset} className="btn-container">
                    <button 
                    ref={randomAnswerOptions[0] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[0]}
                    >
                     {randomAnswerOptions[0]}
                    </button>

                    <button 
                    ref={randomAnswerOptions[1] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[1]}
                    >
                      {randomAnswerOptions[1]}
                    </button>

                    <button 
                    ref={randomAnswerOptions[2] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[2]}
                    >
                      {randomAnswerOptions[2]}
                    </button>

                    <button 
                    ref={randomAnswerOptions[3] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[3]}
                    >
                       {randomAnswerOptions[3]}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default Answers;