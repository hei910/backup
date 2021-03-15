import React from 'react';
import styled from 'styled-components/macro';

interface ComponentProps {
    style?: any;
    children?: any;
}

const SChildrenContainer = styled.div`
    display: flex;

    & > div {
        flex: 2;
        width: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`;

const TableRightSide: React.FC<ComponentProps> = ({ style, children }) => {
    return <SChildrenContainer style={style}>{children}</SChildrenContainer>;
};

export default TableRightSide;
