import React from 'react'
import styled from 'styled-components/macro'
import { IConvertedData } from './types'
import useCommonInit from '@pages/betRecord/hook'
import useTranslation from '@hooks/useTranslation'
import RefreshIcon from '@images/betRecord/reload_icon.svg'
import bgImg from '@styles/mixins/backgroundImg'
interface IPopUpProps {
    data: IConvertedData
    onClickEarlySettle?: () => void
    onClickEarlySettleMock?: () => void
}
const SMainContainer = styled.div`
    text-align: left;
    padding: 24px;
    ${(props) => props.theme.typography.Body3};
`
const SCompetitorsWrapper = styled.div`
    margin-bottom: 8px;
    word-break: break-all;
`
const SOutcomeRow = styled.div`
    margin-bottom: 16px;
    word-break: break-all;
`
const SErrorRow = styled(SOutcomeRow)`
    ${(props) => props.theme.typography.Body4};
`
const SOutcome = styled.span`
    color: ${(props) => props.theme.colors.warning};
`
const SOdds = styled.span`
    color: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.oddsColor};
`
const SBetAmountRow = styled.div`
    margin-bottom: 8px;
    word-break: break-all;
`
const SConfirmButton = styled.div`
    background: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.headerBg};
    color: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.buttonColor};
    border-radius: 12px;
    height: 32px;
    width: 156px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SButtonRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const SRefreshCircle = styled.div`
    ${bgImg(RefreshIcon)}
    height: 24px;
    width: 24px;
    cursor: pointer;
    filter: invert(10%);
`

export default ({ data, onClickEarlySettle, onClickEarlySettleMock }: IPopUpProps) => {
    const { earlySettleStatus, earlySettleOdds } = useCommonInit()
    const t = useTranslation()
    const homeTeam = data?.sportsData?.sportsDetail?.[0]?.homeTeam ?? ''
    const awayTeam = data?.sportsData?.sportsDetail?.[0]?.awayTeam ?? ''
    const outcome = data?.sportsData?.sportsDetail?.[0]?.outcomeName ?? ''
    const odds = earlySettleStatus && earlySettleOdds > 0 ? earlySettleOdds : t(`betRecord.popUpModal.updating`)
    const gamePlayName = data.comboGamePlayName ?? ''
    const betAmount = data.betAmount
    const newEarlySettleOdds = earlySettleOdds > 0 ? (earlySettleOdds * 2).toFixed(2) : '--.--'

    return (
        <SMainContainer>
            <SCompetitorsWrapper>
                {homeTeam} v {awayTeam}
            </SCompetitorsWrapper>
            <SOutcomeRow>
                <SOutcome>{outcome}</SOutcome>@<SOdds>{odds}</SOdds>
            </SOutcomeRow>
            <SBetAmountRow>
                <span>
                    {gamePlayName}: {betAmount}
                </span>
            </SBetAmountRow>
            <SBetAmountRow>
                {t(`betRecord.popUpModal.earlySettle`)}:{newEarlySettleOdds}
            </SBetAmountRow>
            <SErrorRow>* {t(`betRecord.popUpModal.staticMessage`)}</SErrorRow>
            <SButtonRow>
                <SRefreshCircle onClick={onClickEarlySettleMock} />
                <SConfirmButton onClick={onClickEarlySettle}>{t(`betRecord.popUpModal.confirmSettle`)}</SConfirmButton>
            </SButtonRow>
        </SMainContainer>
    )
}
