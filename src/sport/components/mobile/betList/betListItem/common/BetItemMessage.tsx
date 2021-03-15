import { WarningIcon } from '@sport/components/icons'
import React from 'react'
import styled from 'styled-components/macro'

const SBetItemMessageContainer = styled.div`
    display: flex;
    padding: 10px 10px;
    align-items: center;
    background-color: #e64648;
`
const SBetItemMessageWarningIcon = styled(WarningIcon)`
    fill: #fff;
    margin-right: 5px;
`

const SBetItemMessageText = styled.div`
    color: #fff;
`

interface BetItemMessageProps {
    type: string
    message: string
}

const BetItemMessage: React.FC<BetItemMessageProps> = ({ type, message }) => {
    const renderIcon = () => {
        if (type === 'warning') {
            return <SBetItemMessageWarningIcon />
        }
    }

    return (
        <SBetItemMessageContainer>
            {renderIcon()}
            <SBetItemMessageText>{message}</SBetItemMessageText>
        </SBetItemMessageContainer>
    )
}

export default React.memo(BetItemMessage)
