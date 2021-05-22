import React from 'react'

function NextButton({ handleClickNext, isCorrect, getRandomCountry }) {
  return (
    <>
      <button type='button' onClick={handleClickNext} className='btn-next'>
        Next
      </button>
      {isCorrect === true && getRandomCountry}
    </>
  )
}

export default NextButton
