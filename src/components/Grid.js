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
    }
`;

export default function Grid() {
    return (
        <GridStyles>
            {[...Array(26)].map((_, index) => (
                <div className="letter-cell">
                    <span className="letter">{alphabet.upper[index]}</span>
                    <span className="number"> {` (${index + 1})`}</span>
                </div>
            ))}
        </GridStyles>
    );
}
