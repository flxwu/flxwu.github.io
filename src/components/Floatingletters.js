import React, { useState } from 'react';
import COLORS from '../utils/Colors';
import '../styles/FloatingLetters.scss';

function FloatingLetters({ children }) {
  return (
    <div class="floating">
      {children
        .toUpperCase()
        .split('')
        .map((l, id) => (
          <FloatingLetter id={id}>{l}</FloatingLetter>
        ))}
    </div>
  );
}

const FloatingLetter = ({ children, id }) => {
	const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={hover ? 'hover' : ''}
      style={{ color: COLORS[id] }}>
      {children}
    </span>
  );
};

export default FloatingLetters;
