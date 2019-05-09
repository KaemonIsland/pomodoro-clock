import React from 'react';

const IncDec = ({ type, change, incDec }) => (
  <button onClick={() => change(type, incDec)}>
    {incDec === 'inc' ? "Increment" : "Decrement" }
  </button>
)

export default IncDec;