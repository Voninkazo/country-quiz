import React, { useEffect, useRef, useState } from 'react';
import Answers from './Components/Answers';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';
import Header from './Components/Header';
import Popup from './pages/Popup';
import BackgroundImg from './icons/check.svg';


function App() {
    const [countries,setCountries] = useState([]);
    const [score,setScore] = useState(0);
    const [isCorrect,setIsCorrect] = useState(false);
    const [randomCountry,setRoandomCountry] = useState({});
    const [randomOptions,setRandomOptions] = useState([]);
    const [disbledFieldset,setDisabledFieldset] = useState(false);
    const [showNextBtn,setShowNextBtn] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    const correctAnswer = useRef(null);

    // when two capital questions are answered, change the qustion into another type of question and do the same thing again
    const questionRandomNum = Math.floor(Math.random() * 2);

    const fetchCountries = async() => {
        const info = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await info.json();
        setCountries(data);
        getRandomCountry()
        console.log(data);
    }

   function getRandomCountry() {
    // if the obj is empty, do not return anything
    if (!countries.length) return null
    // create the questions and answers from the array randomly
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
    setShowPopup(false)
   }

   
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
        console.log("correct")
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

    // Here we set a few conditions when the next button is clicked
    function clickNext() {
        if (isCorrect) {
            getRandomCountry();
            setShowPopup(false);
            setDisabledFieldset(false)
            // reset the bg color and color and set them into the default colors
            correctAnswer.current.style.backgroundColor = "#ffffff";
            correctAnswer.current.style.color = "rgba(96, 102, 208, 0.8)"
        } else {
            console.log('try again')
            // show result
            setShowPopup(true);
        }
    }

    useEffect(() => {
        fetchCountries();
        setIsCorrect('');
        setDisabledFieldset(false);
    },[])

    return (
    <div>
        <Header 
        fetchCountries={fetchCountries}
        />
        {showPopup ?
            <Popup 
            score={score}
            fetchCountries={fetchCountries}
            />
        :
        <div className="quiz-container">
            <Questions 
            questionRandomNum={questionRandomNum}
            randomCountry={randomCountry}
            />

            <Answers 
            checkAnswer={checkAnswer}
            randomCountry={randomCountry}
            randomOptions={randomOptions}
            disbledFieldset={disbledFieldset}
            correctAnswer={correctAnswer}
            />

            {showNextBtn &&
            <NextButton  
            clickNext={clickNext}
            isCorrect={isCorrect}   
            score={score}
            showPopup={showPopup}
            fetchCountries={fetchCountries}
            />
            }
        </div>
}
    </div>
    )
}

export default App;