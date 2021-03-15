import React from 'react'
import styled from 'styled-components/macro'

interface ComponentProps {
    title: string
}

const SMainContainer = styled.div`
    padding: 10px;
    background: #e4e4e4;
    color: ${(props) => props.theme.sport.colors.primary};
    font-size: 14px;
`

const GreySubHeader: React.FC<ComponentProps> = ({ title }) => {
    return <SMainContainer>{title}</SMainContainer>
}

export default GreySubHeader
