import React, { useState } from 'react';
import styled from 'styled-components';

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

function App() {
    const [hitCount, setHitCount] = useState(0);
    const [missCount, setMissCount] = useState(0);
    const [leftCount, setLeftCount] = useState(26);

    return (
        <GameStyles>
            <HeaderStyles>
                <DisplayStyles>
                    <button className="start-btn">Start Game</button>
                    <div className="display">{17}</div>
                    <input
                        type="text"
                        className="letter-input"
                        placeholder="Input letter"
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
        </GameStyles>
    );
}

export default App;
