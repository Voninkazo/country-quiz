import React from 'react'

function Answers({
  isFieldsetDisabled,
  randomAnswerOptions,
  randomCountry,
  checkAnswer,
  correctAnswer,
}) {
  return (
    <form onClick={(e) => checkAnswer(e)}>
      <fieldset disabled={isFieldsetDisabled} className='btn-container'>
        <button
          ref={
            randomAnswerOptions[0] === randomCountry.name ? correctAnswer : null
          }
          className='btn-country'
          data-value={randomAnswerOptions[0]}>
          <span className='letter'>A</span>
          {randomAnswerOptions[0]}
        </button>

        <button
          ref={
            randomAnswerOptions[1] === randomCountry.name ? correctAnswer : null
          }
          className='btn-country'
          data-value={randomAnswerOptions[1]}>
          <span className='letter'>B</span>
          {randomAnswerOptions[1]}
        </button>

        <button
          ref={
            randomAnswerOptions[2] === randomCountry.name ? correctAnswer : null
          }
          className='btn-country'
          data-value={randomAnswerOptions[2]}>
          <span className='letter'>C</span>
          {randomAnswerOptions[2]}
        </button>

        <button
          ref={
            randomAnswerOptions[3] === randomCountry.name ? correctAnswer : null
          }
          className='btn-country'
          data-value={randomAnswerOptions[3]}>
          <span className='letter'>D</span>
          {randomAnswerOptions[3]}
        </button>
      </fieldset>
    </form>
  )
}

export default Answers
