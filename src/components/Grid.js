import React from 'react';
import alphabet from 'alphabet';
import styled from 'styled-components';

const GridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 1000px;
    margin: 5rem auto;
    .letter-cell {
        font-size: 2rem;
        color: #006699;
        margin: 2rem 0;
        &.hit {
            color: #2eb82e;
        }
        &.miss {
            color: #b30000;
        }
    }
`;

export default function Grid({ marks }) {
    return (
        <GridStyles>
            {[...Array(26)].map((_, index) => (
                <div
                    className={`letter-cell ${
                        marks[index]?.mark === true
                            ? 'hit'
                            : marks[index]?.mark === false
                            ? 'miss'
                            : ''
                    }`}
                    key={index}
                >
                    <span className="letter">{alphabet.upper[index]}</span>
                    <span className="number"> {` (${index + 1})`}</span>
                </div>
            ))}
        </GridStyles>
    );
}
