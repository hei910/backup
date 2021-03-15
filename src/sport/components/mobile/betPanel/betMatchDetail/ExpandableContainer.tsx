import React, { useRef, useState } from 'react'
import styled from 'styled-components/macro'

// types & interface
interface TableHeaderProps {
    defaultVisible?: boolean
    isMenuShow?: boolean
    activeHeight: number
}

// styled components
const HeaderContainer = styled.div`
    color: ${(props) => props.theme.sport.colors.text.primary};
    height: 38px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${(props) => props.theme.sport.colors.tertiary};
    user-select: none;
    transition: all 0.15s linear;
    cursor: pointer;
`

const HeaderData = styled.div`
    font-size: 13px;
    user-select: text;
    text-align: center;
    color: ${(props) => props.theme.sport.colors.active};
`

const ExpandableContent = styled.div<{ height: number }>`
    transition: max-height 0.3s ease-in-out;
    max-height: ${(props) => `${props.height}px`};
    overflow: hidden;
`

const ExpandableContainer: React.FC<TableHeaderProps> = ({ children, defaultVisible = false, activeHeight }) => {
    const tableRef = useRef<any>(null)
    const [height, setHeight] = useState<number>(295)
    const [title, setTitle] = useState<string>('更多')

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        tableRef?.current?.clientHeight && tableRef?.current?.clientHeight > height
            ? setHeight(tableRef.current.clientHeight)
            : setHeight(295)
        title === '更多' ? setTitle('显示更少') : setTitle('更多')
    }

    if ((height !== 295 && activeHeight > height) || (height !== 295 && activeHeight < height)) {
        setHeight(activeHeight)
    }

    return (
        <>
            <ExpandableContent height={height}>
                <div ref={tableRef}>{children}</div>
            </ExpandableContent>
            <HeaderContainer onClick={onClick}>
                <HeaderData>{title}</HeaderData>
            </HeaderContainer>
        </>
    )
}

export default ExpandableContainer
