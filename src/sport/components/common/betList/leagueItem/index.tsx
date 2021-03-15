import React from 'react'
import styled from 'styled-components/macro'

interface LeagueItem {
    matchNum: string | number
    onItemClick?: (e: React.MouseEvent) => any
    isMobile?: boolean
}

const ItemContainer = styled.div<{ isMobile: boolean & React.HTMLAttributes<HTMLDivElement> }>`
    max-width: ${(props) => (props.isMobile ? 'auto' : '33.3%')};
    flex-basis: 100%;
    border-right: 1px solid #d7d7d7;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 10px;
    font-size: 13px;
    background-color: ${(props) => props.theme.sport.colors.table.column.background};
    cursor: pointer;
    justify-content: space-between;
`

const ItemTitle = styled.div`
    color: ${(props) => props.theme.sport.colors.text.title};
    padding: 0 8px;
    font-size: 14px;
`

const ItemMatchNum = styled.div`
    min-width: 28px;
    height: 25px;
    line-height: 25px;
    background: #5a5a5a;
    border-color: #5a5a5a;
    border-radius: 3px;
    text-align: center;
    color: ${(props) => props.theme.sport.colors.nav.menu.background.active};
`

const CompetitionItem: React.FC<LeagueItem> = ({ matchNum, children, onItemClick, isMobile = false }) => {
    return (
        <ItemContainer onClick={onItemClick} isMobile={isMobile}>
            <ItemTitle>{children}</ItemTitle>
            <ItemMatchNum>{matchNum}</ItemMatchNum>
        </ItemContainer>
    )
}

export default React.memo<React.FC<LeagueItem>>(CompetitionItem)
