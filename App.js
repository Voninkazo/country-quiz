import React, { useEffect, useState } from 'react';


function App() {
    const [countries,setCountries] = useState([]);
    const [showScore,setShowScore] = useState(false);
    const [score,setScore] = useState(0);
    const [bgcolor,setBgcolor] = useState({backgroundColor: "white"});
    const [iseAnswered,setIsAnswered] = useState(false);
    const [iseCorrect,setIsCorrect] = useState(false);

    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        console.log(data);
    }

     function nextQuestion() {
        if(iseCorrect) {
            fetchCountries();
        }
        else {
            setShowScore(true);
        }
     }

    useEffect(() => {
        fetchCountries();
    }, [])

    const firstRandomNum = Math.floor(Math.random() * countries.length)
    const secondRandomNum = Math.floor(Math.random() * countries.length)
    const thirdRandomNum = Math.floor(Math.random() * countries.length)
    const fourthRandomNum = Math.floor(Math.random() * countries.length)
    if (!countries.length) return null

    // sort it by alaphabet so that it's going to be more difficult to guess
    const randomNumberArr = [firstRandomNum,fourthRandomNum, secondRandomNum,thirdRandomNum]

    function checkCorrectAnswer(e) {
        e.preventDefault();
        setIsAnswered(true)

        if((countries[firstRandomNum].name) === e.target.dataset.value ){
            console.log("correct")
            setIsCorrect(true)
            setScore(prev => prev + 1);
            setBgcolor({backgroundColor: "green"});
        } 
        else {
            const theRightAnswerIdex = randomNumberArr.find(index => {
                return countries[index].name === countries[firstRandomNum].name
            })
            console.log("incorrect")
            const correctAnswer = countries[theRightAnswerIdex].name;
            console.log(correctAnswer);
            setIsCorrect(false)
            setBgcolor({backgroundColor: "red"})
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
                    className= "btn-country" 
                    data-value={countries[country].name} 
                    style={bgcolor}
                    onClick={checkCorrectAnswer}
                    >
                    {countries[country].name}
                    </button>
                </div>
                ))}
            </div>
            {iseAnswered && 
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