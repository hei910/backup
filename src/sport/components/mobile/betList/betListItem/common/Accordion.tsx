import { ArrowUpIcon } from '@sport/components/icons'
import React, { useState } from 'react'
import styled from 'styled-components/macro'

interface AccordionProps {
    title?: string
    active?: boolean
    child?: JSX.Element
}

const SContainer = styled.div`
    user-select: none;
`

const SHeader = styled.div<{ onClick: () => void }>`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    background-color: #646464;
    cursor: pointer;
`

const STitle = styled.div`
    color: #b4b4b4;
`

const SArrowIcon = styled(ArrowUpIcon)`
    width: 16px;
    height: 16px;
    margin-left: 10px;
    fill: #b4b4b4;
    transform: rotate(360deg);
    transition: 0.2s ease-out;

    &.active {
        transform: rotate(180deg);
    }
`

const SArrowIconMemo = React.memo(SArrowIcon)

const SContent = styled.div``

const Accordion: React.FC<AccordionProps> = ({ title, active = false, child }) => {
    const [show, setShow] = useState(active)

    return (
        <SContainer>
            <SHeader onClick={() => setShow(!show)}>
                {title && <STitle>{title}</STitle>}
                {child && <SArrowIconMemo className={show ? 'active' : 'inactive'} />}
            </SHeader>
            {show && <SContent>{child}</SContent>}
        </SContainer>
    )
}

export default React.memo(Accordion)
