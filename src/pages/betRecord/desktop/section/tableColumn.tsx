import { IConvertedData } from '@pages/betRecord/types'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import BetRecordGameDetail from './gameDetail'
import dayjs from 'dayjs'
import { useSelector } from '@redux'
import BetRecordModal from '@pages/betRecord/betRecordModal'
import BetRecordSettlePopUp from '@pages/betRecord/betRecordSettlePopUp'
import useCommonInit from '@pages/betRecord/hook'
interface IColumnProps {
    data: IConvertedData
    page?: string
    index?: number
}

const STableColumn = styled.td<{ width?: number; status?: string; align?: string }>`
    min-width: 60px;
    width: auto;
    max-width: 200px;
    ${(props) => props.status === 'win' && `color: #397e00;`}
    ${(props) => props.status === 'lose' && `color: #ff0000;`}
    padding: 20px 10px;
    border-right: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 300;
    ${(props) => props.align === 'center' && `text-align: center;`}
`
const STableColumRow = styled.div<{ margintop?: number; marginbottom?: number }>`
    ${(props) => props.marginbottom && `margin-bottom: ${props.marginbottom}px`};
    width: 100%;
    word-break: break-all;
`
const SEarlySettleButton = styled.div`
    border: 1px solid ${(props) => props.theme.colors.page.desktop.betRecord.button.border};
    padding: 10px 5px;
    border-radius: 15px;
`
export const checkWinLose = (netProfit?: string | number) => {
    if (netProfit !== undefined) {
        const positiveOrNegative = Math.sign(Number(netProfit))
        if (positiveOrNegative === 1) {
            return 'win'
        } else if (positiveOrNegative === -1) {
            return 'lose'
        } else if (positiveOrNegative === 0) {
            return 'draw'
        }
    } else {
        return '--'
    }
}
export const BetRecordSeries: React.FC<IColumnProps> = ({ data, page, index }) => {
    const useIndex = [
        'all-bet',
        'sportV2',
        'sports-settled-bet',
        'sports-unsettled-bet',
        'esport',
        'esport-settled-bet',
        'esport-unsettled-bet',
        'loto',
        'lottery',
        'lottery-settled-bet',
        'lottery-unsettled-bet',
        'dt',
        'pt',
        'pg',
        'cq9',
        'jdb',
        // 'nn',
        'ky',
    ]
    if (page === undefined) {
        return <STableColumn />
    }
    return <STableColumn>{useIndex.includes(page) && index !== undefined ? index + 1 : data.betRecordId}</STableColumn>
}
export const BetRecordBetAmount: React.FC<IColumnProps> = ({ data }) => {
    return <STableColumn>{data.betAmount.toFixed(2) ?? '--'}</STableColumn>
}
export const BetRecordBetCategory: React.FC<IColumnProps> = ({ data }) => {
    const isSport = data.gameSupplier.includes('sport') || data.gameSupplier === 'avia'
    return <STableColumn>{isSport ? data.comboGamePlayName : data.gameTypeName}</STableColumn>
}
export const BetRecordBetDetail: React.FC<IColumnProps> = ({ data }) => {
    return (
        <STableColumn align={'center'}>
            <STableColumRow>
                {data.betDateTime && (
                    <span>
                        {dayjs(data.betDateTime).format('YYYY年MM月DD日')}
                        <br /> {dayjs(data.betDateTime).format('HH:mm:ss')}
                    </span>
                )}
            </STableColumRow>
            <STableColumRow>{data.betRecordId && data.betRecordId}</STableColumRow>
        </STableColumn>
    )
}
export const BetRecordBetGame: React.FC<IColumnProps> = ({ data }) => {
    return <STableColumn>{data.gameTypeName ? data.gameTypeName : '--'}</STableColumn>
}
export const BetRecordBetGamePlay: React.FC<IColumnProps> = ({ data }) => {
    const isLotto = data?.gameSupplier?.includes('lot')
    const isEsport = data?.gameSupplier === 'avia'
    return (
        <STableColumn align={'center'}>
            <div>
                {!isEsport && (
                    <>
                        {!isLotto && <span>{data.comboGamePlayName ? data.comboGamePlayName : '--'}</span>}
                        {isLotto && <span dangerouslySetInnerHTML={{ __html: data.gamePlayName || '--' }} />}
                    </>
                )}
                {isEsport && <span>{data.gameTypeName ? data.gameTypeName : data?.comboGamePlayName}</span>}
            </div>
        </STableColumn>
    )
}
export const BetRecordBetVersion: React.FC<IColumnProps> = ({ data }) => {
    return <STableColumn>{data?.gameCode}</STableColumn>
}
export const BetRecordCategory: React.FC<IColumnProps> = ({ data }) => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    return <STableColumn>{t(`betRecord.betCategories.${data?.gameSupplier}`, { brandName })}</STableColumn>
}
export const BetRecordChoice: React.FC<IColumnProps> = ({ data }) => {
    return (
        <BetRecordGameDetail
            metadata={data?.sportsData?.sportsDetail}
            cancelled={data?.cancelled}
            page={data?.gameSupplier}
            gameTypeName={data?.gameTypeName}
            gameCode={data?.gameCode}
            processed={data?.processed}
            data={data}
        />
    )
}
export const BetRecordDate: React.FC<IColumnProps> = ({ data }) => {
    return (
        <STableColumn align={'center'}>
            {data.betDateTime && dayjs(data.betDateTime).format('YYYY年MM月DD日, HH:mm:ss')}
        </STableColumn>
    )
}
export const BetRecordGameCategory: React.FC<IColumnProps> = ({ data }) => {
    return <STableColumn align={'center'}>{data.gameTypeName ?? '--'}</STableColumn>
}
export const BetRecordGameResult: React.FC<IColumnProps> = ({ data }) => {
    const t = useTranslation()
    return <STableColumn>{t(`betRecord.${checkWinLose(data.netProfit)}`) ?? '--'}</STableColumn>
}
export const BetRecordOrderNumber: React.FC<IColumnProps> = ({ data }) => {
    const showBetRecordId = ['dt', 'ky', 'nn', 'pt', 'pg', 'cq9', 'jdb']
    const isBetRecordId = showBetRecordId.includes(data.gameSupplier)
    const orderNumber = isBetRecordId ? data.betRecordId : data.gameCode ?? '--'
    return <STableColumn>{orderNumber}</STableColumn>
}
export const BetRecordRoundNumber: React.FC<IColumnProps> = ({ data }) => {
    return <STableColumn>{data.gameCode ?? '--'}</STableColumn>
}
export const BetRecordStatus: React.FC<IColumnProps> = ({ data }) => {
    const unsettledGame = !data?.processed
    const t = useTranslation()
    const isSports = data.gameSupplier.includes('sport')
    const isSportV1 = data.gameSupplier === 'sportV1'
    const isParlay =
        isSports && data?.sportsData?.sportsDetail !== undefined && data?.sportsData?.sportsDetail.length > 1
            ? true
            : false
    const status = () => {
        if (unsettledGame) {
            if (isSportV1) {
                if (data?.sportsData?.normalSettleTBC) {
                    return t(`betRecord.confirmTBC`)
                } else {
                    return t(`betRecord.confirmed`)
                }
            } else {
                if (!data.cancelled && !data.processed && data.payoutAmount === 0) {
                    return t(`betRecord.confirmed`)
                } else {
                    return '--'
                }
            }
        } else if (!unsettledGame && !isParlay) {
            const status = data?.sportsData?.sportsDetail?.[0]?.winLoseStatus ?? ''
            const winLoseStatus = status.toLowerCase()
            if (status.length === 0) {
                return t(`betRecord.${checkWinLose(data.netProfit)}`)
            } else {
                return t(`betRecord.${winLoseStatus}`)
            }
        } else {
            if (data.cancelled) {
                return t('betRecord.draw')
            } else {
                return t(`betRecord.${checkWinLose(data.netProfit)}`)
            }
        }
    }
    return (
        <STableColumn
            status={
                unsettledGame || data.cancelled || data.netProfit === null || data.netProfit === undefined
                    ? ''
                    : checkWinLose(data.netProfit)
            }>
            {status()}
        </STableColumn>
    )
}
export const BetRecordWinable: React.FC<IColumnProps> = ({ data }) => {
    const isEsport = data.gameSupplier === 'avia'
    return (
        <STableColumn>
            {!isEsport && (
                <>
                    {data?.sportsData?.estimatedWinnings !== null && data?.sportsData?.estimatedWinnings !== undefined
                        ? data?.sportsData?.estimatedWinnings.toFixed(2)
                        : '--'}
                </>
            )}
            {isEsport && '--'}
        </STableColumn>
    )
}
export const BetRecordWinLose: React.FC<IColumnProps> = ({ data }) => {
    const unsettledGame = !data?.processed
    const winLose = () => {
        if (unsettledGame || (!data?.processed && data?.payoutAmount === 0)) {
            return '--'
        } else if (data?.cancelled) {
            return 0.0
        } else if (!unsettledGame && data?.netProfit !== (null || undefined)) {
            return data.netProfit.toFixed(2)
        } else {
            return '--'
        }
    }
    return (
        <STableColumn
            status={
                unsettledGame || data.cancelled || data.netProfit === null || data.netProfit === undefined
                    ? ''
                    : checkWinLose(data?.netProfit)
            }>
            {winLose()}
        </STableColumn>
    )
}

export const BetRecordSettle: React.FC<IColumnProps> = ({ data }) => {
    const { onClickEarlySettleMock, isEarlyBetModalOpen, onClickModalHandler, onClickEarlySettle } = useCommonInit()
    const rowId = data?.sportsData?.rowId
    const masterId = data?.sportsData?.masterId
    const allowEarlySettle = data?.sportsData?.allowEarlySettle
    return (
        <STableColumn>
            {allowEarlySettle && (
                <>
                    <SEarlySettleButton onClick={() => onClickEarlySettleMock({ rowId, masterId })}>
                        提前结算详情
                    </SEarlySettleButton>
                    <BetRecordModal isOpen={isEarlyBetModalOpen} closeButton={onClickModalHandler}>
                        <BetRecordSettlePopUp
                            data={data}
                            onClickEarlySettleMock={() => onClickEarlySettleMock({ rowId, masterId })}
                            onClickEarlySettle={() => onClickEarlySettle({ rowId, masterId })}
                        />
                    </BetRecordModal>
                </>
            )}
        </STableColumn>
    )
}
