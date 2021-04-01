import React, { useEffect, useRef, useState } from 'react';

import Header from './Components/Header';
import PopupResults from './pages/PopupResult';
import Quiz from './Components/Quiz';

function App() {
    const [countries,setCountries] = useState([]);
    const [score,setScore] = useState(0);
    const [isCorrect,setIsCorrect] = useState(false);
    const [randomCountry,setRandomCountry] = useState({});
    const [randomAnswerOptions,setRandoAnswermOptions] = useState([]);
    const [disbledFieldset,setDisabledFieldset] = useState(false);
    const [showNextBtn,setShowNextBtn] = useState(false);
    const [showResults,setShowResults] = useState(false);
    const [startGame,setStartGame] = useState(false);
    const [numberOfTypesOfQuestion,setNumOfTypesOfQuestion] = useState(0);
    const [showStartBtn,setShowStartBtn] = useState(true);
    const correctAnswer = useRef(null);

    // ftech the data from the API
    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        getRandomCountry();
    }

    // ************ GET RANDOM QUIZ QUESTIONS **************

   function getRandomCountry() {
    // if the obj is empty, do not return anything
    if (!countries.length) return null
    // create the questions and answers from the array randomly
    const randomNum = countries[Math.floor(Math.random() * countries.length)]
    const firstRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const secondRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const thirdRandomNum = countries[Math.floor(Math.random() * countries.length)]
    
    let randomOptions = [
        firstRandomNum.name,
        secondRandomNum.name,
        randomNum.name,
        thirdRandomNum.name
    ]
    // sort the array so that it would be more difficult to get the right answer
    randomOptions.sort(() => { return 0.5 - Math.random() });

    setRandomCountry(randomNum);
    setRandoAnswermOptions(randomOptions);
    setIsCorrect('');
    setDisabledFieldset(false);
    setShowNextBtn(false);
    setShowResults(false);
   }

  // ******* HANDLE START BUTTON **********
   function handleStartBtn() {
       setStartGame(true);
       fetchCountries();
       setShowStartBtn(false);
   }

   //*******CHECK ANSWERS *************
   function checkAnswer(e) {
    e.preventDefault();
    setDisabledFieldset(true); 
    setShowNextBtn(true)
    const winCountry = randomCountry.name;
    const userGuesss = e.target.dataset.value;

    if(winCountry === userGuesss ){
        setIsCorrect(true)
        setScore(prev => prev + 1);
        // change the className of the clicked button if it's the correct answer
        e.target.className = "correct";
        console.log("correct");
    } 
    else {
        // change the className the clicked button into red if it's incorrect
        e.target.className = "incorrect";
        // show the correct answer button into green
        correctAnswer.current.className ="correct";
        setIsCorrect(false);    
        console.log("incorrect");   
    }
}

    // ********** HANDLE NEXT BUTTON *************

    function handleClickNext() {
        if (isCorrect) {
            setShowResults(false);
            setDisabledFieldset(false);
            fetchCountries();
            // grab a question random again and be able to change them from time to time
            setNumOfTypesOfQuestion(Math.floor(Math.random() * 3))
            // reset the className and set them into the default styles
            correctAnswer.current.className = "btn-country";
        } else {
            console.log('try again');
            // show result
            setShowResults(true);
        }
    }

    function handleBtnTryAgain() {
        setScore(0);
        fetchCountries();
        setShowResults(false);
        setStartGame(true);
        setNumOfTypesOfQuestion(Math.floor(Math.random() * 3))
    }

    useEffect(() => {
        fetchCountries();
        setIsCorrect('');
        setDisabledFieldset(false);
    },[])

    return (
        <div className="container">
            <Header />
            {startGame ?
            <div>
            {
            showResults ?

            <PopupResults 
            score={score}
            handleBtnTryAgain={handleBtnTryAgain}
            />

            :
            <Quiz 
            randomCountry={randomCountry}
            numberOfTypesOfQuestion={numberOfTypesOfQuestion}
            checkAnswer={checkAnswer}
            randomAnswerOptions={randomAnswerOptions}
            disbledFieldset={disbledFieldset}
            correctAnswer={correctAnswer}
            showNextBtn={showNextBtn}
            handleClickNext={handleClickNext}
            isCorrect={isCorrect}
            fetchCountries={fetchCountries}
            />
            }
            </div>
            :
                <button type="button" onClick={handleStartBtn} className="btn-start">Click to start</button>
            }  
        </div>
    )
}

export default App;