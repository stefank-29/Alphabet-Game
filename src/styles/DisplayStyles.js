import styled from 'styled-components';

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

export default DisplayStyles;
