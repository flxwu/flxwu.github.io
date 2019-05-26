import React from 'react';
import './styles/App.scss';
import FloatingLetters from './components/Floatingletters';

function App() {
  return (
    <div className="App">
      <span className="App-1">
        <span>
          Hey there <i className="ec ec-wave" />
        </span>
        <span>
          <span className="small">I'm</span>
          <FloatingLetters>Felix Wu</FloatingLetters>
        </span>
      </span>
    </div>
  );
}

export default App;
