import React from 'react'
import styled from 'styled-components/macro'

interface MenuItemProps {
    active: string
    onclick: () => void
}

const SBetRecordsMenuItems = styled.div<{ active?: string } & React.HTMLAttributes<HTMLDivElement>>`
    cursor: pointer;
    min-width: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 8px;
    padding: 0px 10px;
    border-bottom: 4px solid ${(props) => (props.active === 'true' ? props.theme.sport.colors.accent : '#363636')};
    word-break: keep-all;
`

const MenuItem: React.FC<MenuItemProps> = ({ active, children, onclick }) => {
    return (
        <SBetRecordsMenuItems active={active} onClick={onclick}>
            {children}
        </SBetRecordsMenuItems>
    )
}

export default MenuItem
