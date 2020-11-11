import React from 'react';

function Answers({disbledFieldset,randomOptions,bgcolor,checkCorrectAnswer}) {
    return(
        <div>
           <fieldset disabled={disbledFieldset}>
                <form onClick={(e) =>checkCorrectAnswer(e)} className="btn-container">
                    <button style={bgcolor} className="btn-country" data-value={randomOptions[0]}>{randomOptions[0]}</button>
                    <button style={bgcolor} className="btn-country" data-value={randomOptions[1]}>{randomOptions[1]}</button>
                    <button style={bgcolor} className="btn-country" data-value={randomOptions[2]}>{randomOptions[2]}</button>
                    <button style={bgcolor} className="btn-country" data-value={randomOptions[3]}>{randomOptions[3]}</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Answers;