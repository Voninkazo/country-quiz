import React from 'react';

import Questions from './Questions';
import Answers from './Answers';
import HeaderImg from './HeaderImg';
import NextButton from './NextButton';

function Quiz(
    {
    randomCountry,
    numberOfTypesOfQuestion,
    checkAnswer,
    randomAnswerOptions,
    disbledFieldset,
    correctAnswer,
    showNextBtn,
    handleClickNext,
    isCorrect,
    fetchCountries,
}
) {
  return (
   <section className="quiz-container">
       <HeaderImg />

       <Questions 
       randomCountry={randomCountry}
       numberOfTypesOfQuestion={numberOfTypesOfQuestion}
       />

       <Answers 
       disbledFieldset={disbledFieldset}
       randomAnswerOptions={randomAnswerOptions}
       randomCountry={randomCountry}
       checkAnswer={checkAnswer}
       correctAnswer={correctAnswer}
       />
       {showNextBtn ? (
        <NextButton 
        handleClickNext={handleClickNext}
        isCorrect={isCorrect}
        fetchCountries={fetchCountries}
        />
       )
       :
       ""
       }
   </section>
  )
}

export default Quiz
