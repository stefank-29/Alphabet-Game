import { start } from 'pretty-error';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Grid from './components/Grid';
import alphabet from 'alphabet';
import DisplayStyles from './styles/DisplayStyles';
import HeaderStyles from './styles/HeaderStyles';

const GameStyles = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #e6e6ff;
    display: flex;
    flex-direction: column;
`;

let interval;

function App() {
    const [hitCount, setHitCount] = useState(0);
    const [missCount, setMissCount] = useState(0);
    const [leftCount, setLeftCount] = useState(26);
    const leftRef = useRef(leftCount);
    const [gameStarted, setGameStarted] = useState(false);

    const [randomNumbers, setRandomNumbers] = useState([]);
    const randomNumbersRef = useRef(randomNumbers);

    const [marks, setMarks] = useState([]);
    const marksRef = useRef(marks);

    const [currLetter, setCurrLetter] = useState('');
    const [currNum, setCurrNum] = useState(0);
    const currNumRef = useRef(currNum);

    function populateNumbers(length) {
        const arr = [];
        // array for random permutation
        for (let i = 0; i < length; i++) {
            arr.push(i + 1);
        }

        const marks = [];
        // array of objects for marking if is hit or miss
        for (let i = 0; i < length; i++) {
            marks.push({ number: i + 1, mark: null });
        }
        setMarks(marks);
        marksRef.current = marks;
        return arr;
    }

    function generateGameNumbers() {
        const numbers = populateNumbers(26);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        randomNumbersRef.current = numbers;
        setRandomNumbers(numbers);
    }

    useEffect(() => {
        generateGameNumbers();
        window.addEventListener('keydown', checkLetter);
    }, []);

    useEffect(() => {
        // stop the game after 26 rounds
        if (leftCount === 0) {
            setGameStarted(false);
            clearInterval(interval);
        }
    }, [leftCount]);

    function checkLetter(e) {
        if ((!(e.key >= 'a') && e.key <= 'z') || leftRef.current === 0) return; // if not a letter return
        setCurrLetter(e.key.toUpperCase());
        const currNum = randomNumbersRef.current[currNumRef.current];
        let marksArr = [];
        if (e.key !== alphabet.lower[currNum - 1]) {
            // miss
            marksArr = marksRef.current.map((mark) =>
                mark.number === currNum ? { ...mark, mark: false } : mark
            );
            setMissCount((prev) => prev + 1);
        } else {
            // hit
            marksArr = marksRef.current.map((mark) =>
                mark.number === currNum ? { ...mark, mark: true } : mark
            );
            setHitCount((prev) => prev + 1);
        }
        nextNumber();
        setLeftCount((prev) => prev - 1);
        leftRef.current = leftRef.current - 1;
        setMarks(marksArr);
        marksRef.current = marksArr;
    }

    // called on timeout
    function changeNumber() {
        const currentNumber = randomNumbersRef.current[currNumRef.current];
        let marksArr = [];
        marksArr = marksRef.current.map((mark) =>
            mark.number === currentNumber ? { ...mark, mark: false } : mark
        );
        setMissCount((prev) => prev + 1);
        setLeftCount((prev) => prev - 1);
        leftRef.current = leftRef.current - 1;
        setMarks(marksArr);
        marksRef.current = marksArr;
        setCurrNum((prevState) => prevState + 1);
        currNumRef.current = currNumRef.current + 1;
    }

    // called on keypressed
    function nextNumber() {
        clearInterval(interval);
        setCurrNum((prevState) => prevState + 1);
        currNumRef.current = currNumRef.current + 1;
        interval = setInterval(changeNumber, 3500);
    }

    function startGame() {
        generateGameNumbers();
        setHitCount(0);
        setMissCount(0);
        leftRef.current = 26;
        setCurrNum(0);
        currNumRef.current = 0;
        clearInterval(interval);
        interval = setInterval(changeNumber, 3500);
        setGameStarted(true);
    }

    function resetGame() {
        clearInterval(interval);
        setGameStarted(false);
    }

    return (
        <GameStyles>
            <HeaderStyles>
                <DisplayStyles>
                    {!gameStarted ? (
                        <button className="start-btn" onClick={startGame}>
                            Start Game
                        </button>
                    ) : (
                        <button className="start-btn" onClick={resetGame}>
                            Stop Game
                        </button>
                    )}
                    <div className="display">
                        {randomNumbers[currNumRef.current]}
                    </div>
                    <input
                        type="text"
                        className="letter-input"
                        placeholder="Input letter"
                        value={currLetter}
                    />
                </DisplayStyles>
                <div className="score">
                    <div className="label">Score</div>
                    <div className="hit">
                        <span>Hit: </span>
                        <span>{hitCount}</span>
                    </div>
                    <div className="miss">
                        <span>Miss: </span>
                        <span>{missCount}</span>
                    </div>
                    <div className="left">
                        <span>Left: </span>
                        <span>{leftCount}</span>
                    </div>
                </div>
            </HeaderStyles>
            <Grid marks={marks} />
        </GameStyles>
    );
}

export default App;
