import React from 'react';


function Header({handleStartBtn,showStartBtn}) {
    return(
        <div className="header-container">
            <h1>Country Quiz</h1>
            {showStartBtn &&
                <button type="button" onClick={handleStartBtn} className="btn-start">Click to start</button>
            }
        </div>
    )
}

export default Header;