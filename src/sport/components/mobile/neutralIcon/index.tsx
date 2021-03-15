import React from 'react';
import styled from 'styled-components/macro';

interface ComponentProps {}

const SNeutralIcon = styled.div`
    width: 20px;
    height: 17px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 0 rgba(128, 177, 0, 0.3);
    background-color: #80b100;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    margin-left: 4px;
    margin-right: 2.5;
`;

const NeutralIcon: React.FC<ComponentProps> = (props) => {
    return <SNeutralIcon>N</SNeutralIcon>;
};

export default NeutralIcon;
