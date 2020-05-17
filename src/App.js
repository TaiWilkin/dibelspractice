import React, { useState, useEffect } from "react";
import { useKey } from "react-use";
import _ from "lodash";
import moment from "moment";
import "./App.css";
const consonents = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
  ""
];
const vowels = ["a", "e", "i", "o", "u", "y"];

function App() {
  const [word, setWord] = useState("");
  const [end, setEnd] = useState(null);
  const [wordEnd, setWordEnd] = useState(null);
  const [missed, setMissed] = useState(0);
  const [answered, setAnswered] = useState(0);
  const incrementAnswered = () => setAnswered(answered => ++answered);
  const incrementMissed = () => setMissed(missed => ++missed);
  const handleCorrect = () => {
    generateWord();
    incrementAnswered();
  };
  const handleWrong = () => {
    generateWord();
    incrementMissed();
  };
  useKey("y", handleCorrect);
  useKey("n", handleWrong);
  const generateWord = () => {
    setWord(
      consonents[_.random(consonents.length - 1)] +
        vowels[_.random(vowels.length - 1)] +
        consonents[_.random(consonents.length - 1)]
    );
    setWordEnd(moment().add(3, "seconds"));
  };

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (end) {
      const time = end.diff(moment());
      if (time <= 0) {
        setEnd(null);
      } else {
        setTimeout(() => {
          setTimeLeft(time);
        }, 1000);
      }
    }
  }, [end, timeLeft]);

  useEffect(() => {
    if (wordEnd) {
      const time = wordEnd.diff(moment());
      if (time <= 0) {
        generateWord();
        incrementMissed();
      }
    }
  }, [wordEnd, missed]);

  const start = () => {
    setEnd(moment().add(1, "minute"));
    generateWord();
    setMissed(0);
    setAnswered(0);
  };

  return (
    <div className="App">
      <p>
        Press start when you're ready to begin. He must say each word aloud
        within three seconds. He will have one minute to read as many words as
        possible. If he reads the word correctly, press 'y' immediately. If he
        reads the word incorrectly, press 'n' immediately. If he sounds the word
        out aloud, press 'n' immediately.
      </p>
      {!end && <button onClick={start}>Start</button>}
      {end && <h1>{word}</h1>}
      {!end && <p>Missed: {missed}</p>}
      {!end && <p>Answered: {answered}</p>}
    </div>
  );
}

export default App;
