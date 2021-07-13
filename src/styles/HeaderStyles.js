import styled from 'styled-components';

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
export default HeaderStyles;
