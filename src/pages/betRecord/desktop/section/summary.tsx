import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import { checkWinLose } from './tableColumn'

interface BetRecordSummaryProps {
    totalBetAmount: string
    totalValidBetAmount: string
    totalPayoutAmount: string
    totalNetProfit: string
}

const SSummaryContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
const SSummaryGreyContainer = styled.div`
    min-width: 390px;
    height: 40px;
    background: ${(props) => props.theme.colors.page.desktop.betRecord.summary.bgColor};
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const SSummarySections = styled.div<{ status?: string }>`
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
    color: ${(props) => props.theme.colors.page.desktop.betRecord.summary.color};
`
const SSummaryTotalWin = styled.div<{ status?: string }>`
    margin-left: 10px;
    margin-right: 20px;
    font-size: 12px;
    ${(props) => (props.status === 'lose' ? `color: #ff0000;` : 'color: #84b752;')}
    font-weight: bold;
`
const SSummaryNumbers = styled(SSummarySections)`
    color: ${(props) => props.theme.colors.page.desktop.betRecord.summary.numberColor};
    font-weight: bold;
`

const BetRecordSummary: React.FC<BetRecordSummaryProps> = ({
    totalBetAmount,
    totalValidBetAmount,
    // totalPayoutAmount,
    totalNetProfit,
}) => {
    const t = useTranslation()
    //const totalWinAmount = Number(totalPayoutAmount) > 0 ? Number(totalNetProfit).toFixed(2) : Number(0).toFixed(2)
    return (
        <SSummaryContainer>
            <SSummaryGreyContainer>
                <SSummarySections>{t(`betRecord.summary.totalBetAmount`)}:</SSummarySections>
                <SSummaryNumbers>{totalBetAmount}</SSummaryNumbers>
                <SSummarySections>{t(`betRecord.summary.totalValidBetAmount`)}:</SSummarySections>
                <SSummaryNumbers>{totalValidBetAmount}</SSummaryNumbers>
                <SSummarySections>{t(`betRecord.summary.totalPayoutAmount`)}:</SSummarySections>
                <SSummaryTotalWin status={checkWinLose(totalNetProfit)}>{totalNetProfit}</SSummaryTotalWin>
            </SSummaryGreyContainer>
        </SSummaryContainer>
    )
}
export default BetRecordSummary
