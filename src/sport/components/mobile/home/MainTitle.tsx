import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

interface ComponentProps {
    title: string
    count: number
    date: string
    type?: string
}
const STitle = styled.div`
    color: ${(props) => props.theme.sport.colors.topPage.mainHeader};
`
const STotalNumber = styled.div`
    padding: 0px 5px;
    background: ${(props) => props.theme.sport.colors.background};
    border-radius: 9px;
    font-size: 16px;
    color: ${(props) => props.theme.sport.colors.primary};
    height: 32px;
    font-weight: bold;
    min-width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SMainTitleLink = styled(Link)`
    background: white;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 10px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`

const SMainTitle = styled.div<{ type?: string }>`
    background: white;
    font-size: 18px;
    font-weight: 900;
    padding: 15px 10px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`

const MainTitle: React.FC<ComponentProps> = ({ title, count, date, type }) => {
    if (date === 'inplay') {
        return (
            <SMainTitleLink
                to={{
                    pathname: `/sport/${date}/football`,
                    state: { matchStatus: 'home' },
                }}>
                <STitle>{title}</STitle>
                <STotalNumber>{count}</STotalNumber>
            </SMainTitleLink>
        )
    } else {
        return (
            <SMainTitle type={type ?? 'link'}>
                <STitle>{title}</STitle>
                <STotalNumber>{count}</STotalNumber>
            </SMainTitle>
        )
    }
}

export default MainTitle
