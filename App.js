import React, { useEffect, useRef, useState } from 'react';
import Answers from './Components/Answers';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';
import Header from './Components/Header';
import Results from './pages/PopupResult';
import HeaderImg from './Components/HeaderImg';


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
    const correctAnswer = useRef(null);

    // ftech the data from the API
    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        getRandomCountry();
        console.log(data);
    }

    // get the answers options and questions rnadomly 
   function getRandomCountry() {
    // if the obj is empty, do not return anything
    if (!countries.length) return null
    // create the questions and answers from the array randomly
    const randomNum = countries[Math.floor(Math.random() * countries.length)]
    const firstRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const secondRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const thirdRandomNum = countries[Math.floor(Math.random() * countries.length)]
    const fourthRandomNum = countries[Math.floor(Math.random() * countries.length)]

    let randomOptions = [
        firstRandomNum.name,
        secondRandomNum.name,
        randomNum.name,
        fourthRandomNum.name,
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

   // handel strat button to start the game
   function handleStartBtn() {
       setStartGame(true);
       fetchCountries();
   }

   // This function will check whatever answer has a user clicked and say if it's correct or not
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

    // Here we set a few conditions when the next button is clicked:
    // change bg color of buttons 
    function handleClickNext() {
        if (isCorrect) {
            setShowResults(false);
            setDisabledFieldset(false);
            // fetch a new question
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

    // When we clcik the try button, set the score into 0 again and fetch another question and close the result
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
    <div>
        <Header 
        handleStartBtn={handleStartBtn}
        />
        <main>
        {showResults ?
            <Results 
            score={score}
            handleBtnTryAgain={handleBtnTryAgain}
            />
        :  startGame ? 
        <div className="quiz-container">
            <HeaderImg />
            <Questions 
            randomCountry={randomCountry}
            numberOfTypesOfQuestion={numberOfTypesOfQuestion}
            />

            <Answers 
            checkAnswer={checkAnswer}
            randomCountry={randomCountry}
            randomAnswerOptions={randomAnswerOptions}
            disbledFieldset={disbledFieldset}
            correctAnswer={correctAnswer}
            />

            {showNextBtn &&
            <NextButton  
            handleClickNext={handleClickNext}
            isCorrect={isCorrect}
            fetchCountries={fetchCountries}
            />
            }
        </div>
        : ""
}       </main>
    </div>
    )
}

export default App;