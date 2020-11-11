import React from 'react';


function Popup({score,fetchCountries}) {
    return(
          <div className="popup">
                <p>Score:{score}</p>
                <button type="button" onClick={fetchCountries} className="btn-try-again">Try again</button>
            </div>
    )
}

export default Popup;