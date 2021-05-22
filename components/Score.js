import React from 'react'
import WinnerImg from '../webroot/images/winner.svg'

function Score({ score, handleBtnTryAgain }) {
  return (
    <section className='popup'>
      <img src={WinnerImg} alt='img' />
      <h4>Results</h4>
      <p>
        You got <b>{score}</b> correct {`${score > 1}` ? 'asnwers' : 'answer'}
      </p>
      <button
        type='button'
        onClick={handleBtnTryAgain}
        className='btn-try-again'>
        Try again
      </button>
    </section>
  )
}

export default Score
