import { start } from 'pretty-error';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Grid from './components/Grid';
import alphabet from 'alphabet';

const GameStyles = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #e6e6ff;
    display: flex;
    flex-direction: column;
`;

const HeaderStyles = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5rem;
    .score {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        .label {
            color: #a3a3c2;
        }
        .hit {
            color: #2eb82e;
        }
        .miss {
            color: #b30000;
        }
        .left {
            color: #5c5cd6;
        }
    }
`;

const DisplayStyles = styled.div`
    margin-right: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .start-btn {
        width: 12rem;
        padding: 1.2rem 1.5rem;
        margin-bottom: 2.5rem;
        border-radius: 5px;
        border: 1px solid #0066ff;
        color: #0066ff;
        background: none;
        transition: background 0.3s ease-in-out;
        cursor: pointer;
        :hover {
            background-color: rgba(0, 77, 255, 0.1);
        }
    }
    .display {
        font-size: 4rem;
        color: #00001a;
        text-align: center;
        margin-bottom: 2rem;
    }
    .letter-input {
        padding: 1rem 1.2rem;
        outline: none;
        border: 2px solid #338aff;
        border-radius: 4px;
        font-size: 1.6rem;
        outline: none;
        background-color: #fefefecc;
        ::placeholder {
            font-weight: 700;
        }
        :hover,
        :focus {
            box-shadow: 0 0 4px 1px #668aff77;
        }
    }
`;

let interval;

function App() {
    const [hitCount, setHitCount] = useState(0);
    const [missCount, setMissCount] = useState(0);
    const [leftCount, setLeftCount] = useState(26);
    const [gameStarted, setGameStarted] = useState(false);

    const [randomNumbers, setRandomNumbers] = useState([]);
    const randomNumbersRef = useRef(randomNumbers);

    const [marks, setMarks] = useState([]);
    const marksRef = useRef(marks);

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

    function checkLetter(e) {
        const currNum = randomNumbersRef.current[currNumRef.current];
        let marksArr = [];
        if (e.key !== alphabet.lower[currNum - 1]) {
            // miss
            marksArr = marksRef.current.map((mark) =>
                mark.number === currNum ? { ...mark, mark: false } : mark
            );
        } else {
            // hit
            marksArr = marksRef.current.map((mark) =>
                mark.number === currNum ? { ...mark, mark: true } : mark
            );
        }
        setMarks(marksArr);
        marksRef.current = marksArr;
    }

    function changeNumber() {
        setCurrNum((prevState) => prevState + 1);
        currNumRef.current = currNumRef.current + 1;
    }

    function startGame() {
        generateGameNumbers();
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
                    <div className="display">{randomNumbers[currNum]}</div>
                    <input
                        type="text"
                        className="letter-input"
                        placeholder="Input letter"
                    />
                    <pre>{JSON.stringify(randomNumbers)}</pre>
                    <pre>{JSON.stringify(marks)}</pre>
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
