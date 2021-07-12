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
    .score {
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
    .start-btn {
        padding: 1.2rem 1.5rem;
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
                    <button className="start-btn"></button>
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
