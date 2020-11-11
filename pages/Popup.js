import React from 'react';
import WinnerImg from '../winner.svg';


function Popup({score,fetchCountries}) {
    return(
          <div className="popup">
              <img src={WinnerImg} alt="img"/>
              <h4>Results</h4>
              <p>You got <b>{score}</b> correct answers</p>
              <button type="button" onClick={fetchCountries} className="btn-try-again">Try again</button>
            </div>
    )
}

export default Popup;