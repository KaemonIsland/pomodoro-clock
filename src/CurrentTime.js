import React from 'react';

const CurrentTime = ({ current, type }) => {
  let extraZero = current.currSec < 10 ? 0 : null;

  let capitalize = () => (type.charAt(0).toUpperCase() + type.slice(1))
  
  return (
    <>
      <h2>{capitalize()} Time Left</h2>
      <h1>{current.currMin}:{extraZero}{current.currSec}</h1>
    </>
  )
}

export default CurrentTime;