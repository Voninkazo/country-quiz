import React from 'react'

function Questions({ randomCountry, numberOfTypesOfQuestion }) {
  return (
    <div className='question-container'>
      {numberOfTypesOfQuestion === 0 ? (
        <div>
          <img src={randomCountry.flag} className='flag' />
          <h3>Which country does this flag belong to?</h3>
        </div>
      ) : numberOfTypesOfQuestion === 2 ? (
        <h3>{randomCountry.capital} is the capital of ?</h3>
      ) : (
        <h3>{randomCountry.region} is the region of ?</h3>
      )}
    </div>
  )
}

export default Questions
