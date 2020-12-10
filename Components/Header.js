import React from 'react';


function Header({handleStartBtn,showStartBtn}) {
    return(
        <header className="header-container">
            <h1>Country Quiz</h1>
            {showStartBtn &&
                <button type="button" onClick={handleStartBtn} className="btn-start">Click to start</button>
            }
        </header>
    )
}

export default Header;