import React, { useEffect, useState } from 'react';


function App() {
    const [countries,setCountries] = useState([]);
    const [showScore,setShowScore] = useState(false);
    const [showNextQuestion,setShowNextQuestion] = useState(false);
    const [score,setScore] = useState(0);

    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        console.log(data);
    }

    function nextQuestion() {
        fetchCountries();
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    if (!countries.length) return null
    const firstRandomNum = Math.floor(Math.random() * countries.length)
    const secondRandomNum = Math.floor(Math.random() * countries.length)
    const thirdRandomNum = Math.floor(Math.random() * countries.length)
    const fourthRandomNum = Math.floor(Math.random() * countries.length)
    const randomNumberArr = [firstRandomNum,thirdRandomNum, secondRandomNum, fourthRandomNum]

  let correctAnswer;
    function checkCorrectAnswer(e) {
        console.log(e.target.value);
        if((countries[firstRandomNum].name) === (e.target.value)) {
            console.log("correct")
            setShowNextQuestion(true);
            setScore(prev => prev + 1);
        } else {
            setShowScore(true);
            setShowNextQuestion(false);
            const theRightAnswerIdex = randomNumberArr.find(index => {
                return countries[index].name === countries[firstRandomNum].name
            })
            console.log("incorrect")
            console.log(theRightAnswerIdex);
            correctAnswer = countries[theRightAnswerIdex].name;
            console.log(correctAnswer);
        }
    }

    return (
        <div className="quiz-container">
            <p className="question-quiz"> <em>{countries[firstRandomNum].capital}</em> is the capital of ?</p>
            <div>
                {randomNumberArr.map(country => (
                <div className="btn-container" key={countries[country].name}>
                    <button 
                    type="button" 
                    className= "btn-country " 
                    value={countries[country].name} 
                    onClick={checkCorrectAnswer}>
                    {countries[country].name}
                    </button>
                </div>
                ))}
            </div>
            {showNextQuestion &&
                <button type="button" className="btn-next" onClick={nextQuestion}>Next</button>
            }
            {
            showScore && 
            <div>
                <p>Score: {score}</p>
                <button type="button">Try again</button>
            </div>
            }
        </div>
    )
}

export default App;