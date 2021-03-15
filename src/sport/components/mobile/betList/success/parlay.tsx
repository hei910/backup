import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@redux'
import { SubmitBetResultParlay } from '@services/sportBet/types'
import styled from 'styled-components/macro'

const SItemContainer = styled.div`
    border-bottom: 1px solid #b2c498;
`

const SItemTitle = styled.div`
    color: #5a6e32;
`

const SRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

const SLeft = styled.div`
    text-align: left;
`

const SRight = styled.div`
    text-align: right;
`

const SBox = styled.div`
    font-size: 15px;
    color: #c0c0c0;
`

const SBetInvoiceNumber = styled.div`
    margin-bottom: 5px;
`

const ParlayBet: React.FC<SubmitBetResultParlay> = ({ n, c, r, odds, unitAnte, estimatedWinnings, uuid }) => {
    const { t } = useTranslation()
    const title = t(`betList.parlayCombination.${n}X${r}`)

    return (
        <SItemContainer>
            <SItemTitle>{`${title}@${odds.toFixed(2)}`}</SItemTitle>
            <SRow>
                <SLeft>
                    <SBox>{t('betList.stake')}</SBox>
                    <SBox>{`${unitAnte.toFixed(2)} X ${c}`}</SBox>
                </SLeft>
                <SRight>
                    <SBox>{t('betList.toWin')}</SBox>
                    <SBox>{estimatedWinnings.toFixed(2)}</SBox>
                </SRight>
            </SRow>
            <SBetInvoiceNumber>{`${t('betList.invoiceNumber')}: ${uuid}`}</SBetInvoiceNumber>
        </SItemContainer>
    )
}

const ParlayBetMemo = React.memo(ParlayBet)

const SParlayContainer = styled.div`
    margin: 10px;
`

const SParlayContainerHeader = styled.div`
    padding: 16px 10px;
    color: #b4b4b4;
    background-color: #646464;
`

const SParlayContainerContent = styled.div`
    background-color: #edf4e2;
    padding: 10px;
`

const BetListSuccessParlay = () => {
    const submitBetResultParlay = useSelector((store) => store.sportBet.submitBetResult?.parlay ?? {})
    const { t } = useTranslation()

    const parlaies = Object.values(submitBetResultParlay).map((value) => {
        const { uuid } = value

        return <ParlayBetMemo key={`betSubmit-result-parlay-${uuid}`} {...value} />
    })

    if (parlaies.length > 0) {
        return (
            <SParlayContainer>
                <SParlayContainerHeader>{t('betList.multipleBetTitle')}</SParlayContainerHeader>
                <SParlayContainerContent>{parlaies}</SParlayContainerContent>
            </SParlayContainer>
        )
    } else {
        return null
    }
}

export default React.memo(BetListSuccessParlay)
