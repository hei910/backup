import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

interface BetListHeaderProps {
    balance?: number
    balanceColor?: string
    balanceSize?: number
    buttonOnClick: () => void
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
    title: string
}

const SContainer = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #4b4b4b;
    user-select: none;
`

const STitle = styled.div`
    color: #fff;
`

const SBalance = styled.div<{ balanceColor?: string; balanceSize?: number }>`
    color: ${(props) => props.balanceColor ?? '#fff'};
    font-size: ${(props) => props.balanceSize ?? 16}px;
`

const SButton = styled.div``

const BetListHeader: React.FC<BetListHeaderProps> = ({
    title,
    icon: Icon,
    balance,
    balanceColor,
    balanceSize,
    buttonOnClick,
}) => {
    const { t } = useTranslation()

    const getBalance = () => {
        if (balance && !isNaN(balance)) {
            return (
                <SBalance balanceColor={balanceColor} balanceSize={balanceSize}>{`${t(
                    'betList.balance',
                )}: ${balance.toFixed(2)}`}</SBalance>
            )
        }

        return null
    }

    return (
        <SContainer>
            <STitle>{title}</STitle>
            {getBalance()}
            {Icon && (
                <SButton>
                    <Icon onClick={buttonOnClick} />
                </SButton>
            )}
        </SContainer>
    )
}

export default React.memo(BetListHeader)
