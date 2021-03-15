import React from 'react'
import styled from 'styled-components/macro'
import MSkeletion from './MSkeletion'

const MSSkeletion = styled(MSkeletion)`
    height: 20px;
    margin: 10px;
    max-width: 250px;
`

const SRootContainer = styled.div`
    background: ${(props) => props.theme.sport.colors.text.background};
    margin-top: -5px;
`

const SFilterItem = styled.div``

const SHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    background: ${(props) => props.theme.sport.colors.text.background};
    box-shadow: 0 1.5px 9.5px 0 rgba(0, 0, 0, 0.1);
`

const SContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SCount = styled(MSSkeletion)`
    border-radius: 5px;
    width: 25px;
    height: 25px;
    margin: 10px;
`

const FilterItem = (
    <SFilterItem>
        <SHeaderContainer>
            <MSSkeletion width={20} />
        </SHeaderContainer>
        <SContentContainer>
            <MSSkeletion width={40} />
            <SCount />
        </SContentContainer>
        <SContentContainer>
            <MSSkeletion width={40} />
            <SCount />
        </SContentContainer>
    </SFilterItem>
)

const BetFilterSkeletonLoader: React.FC = () => {
    return (
        <SRootContainer>
            {FilterItem}
            {FilterItem}
            {FilterItem}
            {FilterItem}
            {FilterItem}
        </SRootContainer>
    )
}

export default BetFilterSkeletonLoader
