import React, { useEffect, useRef, useState } from 'react';
import Answers from './Components/Answers';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';
import Header from './Components/Header';
import Results from './pages/PopupResult';
import BackgroundImg from './icons/check.svg';


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
    let randomOptions = [randomNum.name,firstRandomNum.name,secondRandomNum.name,thirdRandomNum.name,fourthRandomNum.name]
    // randomOptions.sort(() => { return 0.5 - Math.random() });

    setRandomCountry(randomNum);
    setRandoAnswermOptions(randomOptions);
    setIsCorrect('');
    setDisabledFieldset(false);
    setShowNextBtn(false);
    setShowResults(false);
   }

    // when two capital questions are answered, change the qustion into another type of question and do the same thing again
    const numberOfQuest= Math.floor(Math.random() * 2);

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
        // change the bg color the clicked button into green if it's the correct answer
        e.target.style.backgroundColor = "#60BF88";
        e.target.style.backgroundImage = `${BackgroundImg}`;
        e.target.style.color = "#ffffff";
        console.log("correct");
    } 
    else {
        //// change the bg color the clicked button into red if it's incorrect
        e.target.style.backgroundColor = "#EA8282";
        e.target.style.color = "#ffffff";

        // show the correct answer button into green
        correctAnswer.current.style.backgroundColor = "#60BF88";
        correctAnswer.current.style.backgroundImage =`${BackgroundImg}`;
        correctAnswer.current.style.color = "#ffffff";
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
            // reset the bg color and color and set them into the default colors
            correctAnswer.current.style.backgroundColor = "#ffffff";
            correctAnswer.current.style.color = "rgba(96, 102, 208, 0.8)"
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
            <Questions 
            randomCountry={randomCountry}
            numberOfQuest={numberOfQuest}
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