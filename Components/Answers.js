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
                    <span className="letter">A</span> <span>{randomAnswerOptions[0]}</span>
                    </button>

                    <button 
                    ref={randomAnswerOptions[1] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[1]}
                    >
                     <span className="letter">B</span> <span>{randomAnswerOptions[1]}</span>
                    </button>

                    <button 
                    ref={randomAnswerOptions[2] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[2]}
                    >
                     <span className="letter">C</span> <span>{randomAnswerOptions[2]}</span>
                    </button>

                    <button 
                    ref={randomAnswerOptions[3] === randomCountry.name ? correctAnswer : null} 
                    className="btn-country" 
                    data-value={randomAnswerOptions[3]}
                    >
                     <span className="letter">D</span>  <span>{randomAnswerOptions[3]}</span>
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default Answers;