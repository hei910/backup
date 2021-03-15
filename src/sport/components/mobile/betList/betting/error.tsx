import React from 'react';
import styled from 'styled-components/macro';

interface BettingErrorProps {
    message: any;
}

const SContainer = styled.div`
    color: #e1830c;
    background-color: #373737;
    margin: 0 5px 5px 5px;
    padding: 5px;
    text-align: center;
`;

const BettingError: React.FC<BettingErrorProps> = ({ message }) => {
    if (!message) {
        return null;
    }

    return <SContainer>{message}</SContainer>;
};

export default React.memo(BettingError);
