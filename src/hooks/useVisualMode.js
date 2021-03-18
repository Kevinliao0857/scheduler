import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])
  
  const transition = function (newMode, replace = false) {
    
    setHistory(prev => {
      if (replace) {
        // const newHistory = [...history];
        // newHistory.push(newMode);
        // setHistory(newHistory); 
        return [...prev.slice(0, -1), newMode]
      } else {
        return [...history, newMode]
      }
    });
  }
  
  const back = function () {
    if (history.length < 2) {
      return;
    }
    
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
  };
  
  const mode = history.slice(-1)[0];
  return { mode, transition, back, history };
}


