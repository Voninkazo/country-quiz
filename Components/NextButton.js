import React from 'react';
import {Link, Switch,Route} from 'react-router-dom';


function NextButton({clickNext,isCorrect, getRandomCountry,score}) {
    return (
        <div>
            <button type="button" onClick={clickNext}>Next</button>
        {isCorrect === true ?
        getRandomCountry
            :
            (

                <div>
                <Link to="/score">
                 <p>Score:{score}</p>
                </Link>
                <Switch>
                    <Route path="/score">
                        <p>Try again</p>
                    </Route>
                </Switch>
                </div>

            )
        }
        </div>
    )
}

export default NextButton;