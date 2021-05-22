import React, { useEffect, useRef, useState } from 'react'

import Header from './components/Header'
import Score from './components/Score'
import Quiz from './components/Quiz'

const payload = `https://restcountries.eu/rest/v2/all`

function App() {
  // initialize states
  const [countries, setCountries] = useState([])
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [randomCountry, setRandomCountry] = useState({})
  const [randomAnswerOptions, setRandoAnswermOptions] = useState([])
  const [isFieldsetDisabled, setIsFieldsetDisabled] = useState(false)
  const [showNextBtn, setShowNextBtn] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [startGame, setStartGame] = useState(false)
  const [numberOfTypesOfQuestion, setNumOfTypesOfQuestion] = useState(0)
  const correctAnswer = useRef(null)

  // ftech the data from the API
  const fetchCountries = async () => {
    const info = await fetch(payload)
    const data = await info.json()
    setCountries(data)
    getRandomCountry()
  }

  // ************ GET RANDOM QUIZ QUESTIONS **************

  function getRandomCountry() {
    // if the object is empty, do not return anything
    if (!countries.length) return null
    // create the questions and answers from the array randomly
    const country = countries[Math.floor(Math.random() * countries.length)]
    const answerOption1 =
      countries[Math.floor(Math.random() * countries.length)]
    const answerOption2 =
      countries[Math.floor(Math.random() * countries.length)]
    const answerOption3 =
      countries[Math.floor(Math.random() * countries.length)]

    let answerOptions = [
      answerOption1.name,
      answerOption2.name,
      country.name,
      answerOption3.name,
    ]
    // sort the array so that it would be more difficult to get the right answer
    answerOptions.sort(() => {
      return 0.5 - Math.random()
    })

    setRandomCountry(country)
    setShowNextBtn(false)
    setIsFieldsetDisabled(false)
    setRandoAnswermOptions(answerOptions)
  }

  // ******* HANDLE START BUTTON **********
  function handleStartBtn() {
    setStartGame(true)
    fetchCountries()
  }

  //*******CHECK ANSWERS *************
  function checkAnswer(e) {
    e.preventDefault()
    setIsFieldsetDisabled(true)
    setShowNextBtn(true)
    const winCountry = randomCountry.name
    const chosenCountry = e.target.dataset.value
    const buttons = Array.from(document.querySelectorAll('.btn-country'))
    buttons.forEach((button) => button.classList.add('button'))

    if (winCountry === chosenCountry) {
      setIsCorrect(true)
      setScore((prev) => prev + 1)
      // change the className of the clicked button if it's the correct answer
      e.target.className = 'correct'
      e.target.setAttribute('id', 'correct')
    } else {
      // change the className the clicked button into red if it's incorrect
      e.target.className = 'incorrect'
      e.target.setAttribute('id', 'incorrect')
      // show the correct answer button into green
      correctAnswer.current.className = 'correct'
      correctAnswer.current.setAttribute('id', 'correct')
      setIsCorrect(false)
    }
  }

  // ********** HANDLE NEXT BUTTON *************

  function handleClickNext() {
    setIsFieldsetDisabled(false)
    setIsCorrect(false)
    setStartGame(true)
    if (isCorrect) {
      setShowScore(false)
      fetchCountries()
      // grab a question random again and be able to change them from time to time
      setNumOfTypesOfQuestion(Math.floor(Math.random() * 3))
      // reset the className and set them into the default styles
      correctAnswer.current.className = 'btn-country'
    } else {
      // show result
      setShowScore(true)
    }
  }

  function handleBtnTryAgain() {
    setScore(0)
    setShowScore(false)
    setStartGame(true)
    fetchCountries()
    setIsFieldsetDisabled(false)
    setNumOfTypesOfQuestion(Math.floor(Math.random() * 3))
  }

  useEffect(() => {
    setIsFieldsetDisabled(false)
    fetchCountries()
    setIsCorrect(false)
  }, [])

  return (
    <div className='container'>
      <Header />
      {startGame ? (
        <div>
          {showScore ? (
            <Score score={score} handleBtnTryAgain={handleBtnTryAgain} />
          ) : (
            <Quiz
              randomCountry={randomCountry}
              numberOfTypesOfQuestion={numberOfTypesOfQuestion}
              checkAnswer={checkAnswer}
              randomAnswerOptions={randomAnswerOptions}
              isFieldsetDisabled={isFieldsetDisabled}
              correctAnswer={correctAnswer}
              showNextBtn={showNextBtn}
              handleClickNext={handleClickNext}
              isCorrect={isCorrect}
              fetchCountries={fetchCountries}
            />
          )}
        </div>
      ) : (
        <button type='button' onClick={handleStartBtn} className='btn-start'>
          Click to start
        </button>
      )}
    </div>
  )
}

export default App
