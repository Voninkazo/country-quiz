import React from 'react'

import Questions from './Questions'
import Answers from './Answers'
import NextButton from './NextButton'

function Quiz({
  randomCountry,
  numberOfTypesOfQuestion,
  checkAnswer,
  randomAnswerOptions,
  isFieldsetDisabled,
  correctAnswer,
  showNextBtn,
  handleClickNext,
  isCorrect,
  fetchCountries,
}) {
  return (
    <section className='quiz-container'>
      <Questions
        randomCountry={randomCountry}
        numberOfTypesOfQuestion={numberOfTypesOfQuestion}
      />

      <Answers
        isFieldsetDisabled={isFieldsetDisabled}
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
          showNextBtn={showNextBtn}
        />
      ) : (
        ''
      )}
    </section>
  )
}

export default Quiz
