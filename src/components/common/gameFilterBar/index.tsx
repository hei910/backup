import React from 'react'
import styled from 'styled-components/macro'

export interface ICustomGameFilterBar {
    initialValue?: ICategory
    categories: ICategory[]
    onChange: (category: ICategory) => void
}

interface IGameFilterBar {
    className?: string
}

export interface ICategory {
    label: string
    value: string
    dataQa?: string
}

export interface IGameFilterBarItem {
    isActive?: boolean
}

type GameFilterBarType = React.FC<IGameFilterBar> & {
    Item: typeof SGameFilterBarItem
}

const SGameFilterBar = styled.div`
    display: flex;
    align-items: center;
`

const SGameFilterBarItem = styled.div<IGameFilterBarItem>`
    margin-right: 12px;
    padding: 6px 12px;
    border-radius: 17px;
    font-size: 14px;
    color: ${(props) => (props.isActive ? '#ffffff' : '#a5a5a5')};
    background-color: ${(props) => (props.isActive ? '#0c186c' : '#fff')};
    cursor: pointer;
`

const GameFilterBar: GameFilterBarType = ({ className, children }) => {
    return <SGameFilterBar className={className}>{children}</SGameFilterBar>
}

GameFilterBar.Item = SGameFilterBarItem

export default GameFilterBar
