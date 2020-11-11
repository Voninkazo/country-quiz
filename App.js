import React, { useEffect, useState } from 'react';
import Answers from './Components/Answers';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';


function App() {
    const [countries,setCountries] = useState([]);
    const [score,setScore] = useState(0);
    const [bgcolor,setBgcolor] = useState({backgroundColor: "white"});
    const [isCorrect,setIsCorrect] = useState(false);
    const [randomContry,setRoandomCountry] = useState({});
    const [randomOptions,setRandomOptions] = useState([]);
    const [disbledFieldset,setDisabledFieldset] = useState(false);
    const [showNextBtn,setShowNextBtn] = useState(false);

    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        getRandomCountry()
        console.log(data);
    }

   function getRandomCountry() {
    if (!countries.length) return null
    const randomNum = countries[Math.floor(Math.random() * countries.length)]
    const firstRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const secondRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const thirdRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const fourthRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const randomOptions = [randomNum.name,firstRandomNum.name,secondRandomNum.name,thirdRandomNum.name,fourthRandomNum.name]

    setRoandomCountry(randomNum);
    setRandomOptions(randomOptions);
    setIsCorrect('');
    setDisabledFieldset(false);
    setShowNextBtn(false)
   }

    function clickNext() {
        if (isCorrect) {
            getRandomCountry();
        } else {
            console.log('try again')
        }
    }

    const questionRandomNum = Math.floor(Math.random() * 2);

    function checkCorrectAnswer(e) {
        e.preventDefault();
        setDisabledFieldset(true);
        setShowNextBtn(true)
        const winCountry = randomContry.name;
        const userGuesss = e.target.dataset.value;

        if(winCountry === userGuesss ){
            console.log("correct")
            setIsCorrect(true)
            setScore(prev => prev + 1);
            setBgcolor({backgroundColor: "green"});
        } 
        else {
            console.log("incorrect")
            setIsCorrect(false)
            setBgcolor({backgroundColor: "red"})
        }
    }

    useEffect(() => {
        fetchCountries();
        setIsCorrect('');
        setDisabledFieldset(false);
        setBgcolor({backgroundColor: "white"})
    },[])

    return (
        <div className="quiz-container">
            <button type="button" onClick={getRandomCountry}>Start</button>

            <Questions 
            questionRandomNum={questionRandomNum}
            randomContry={randomContry}
            />

            <Answers 
            checkCorrectAnswer={checkCorrectAnswer}
            randomContry={randomContry}
            randomOptions={randomOptions}
            bgcolor={bgcolor}
            disbledFieldset={disbledFieldset}
            />

            {showNextBtn &&
            <NextButton  
            clickNext={clickNext}
            isCorrect={isCorrect}
            score={score}
            />

            }
        </div>
    )
}

export default App;