import { useRef } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import RecordCard from './recordCard'
import useTranslation from '@hooks/useTranslation'
import { IRecordProps } from '../types'
import { TAB_HEIGHT } from '../tabs'
import IconNoRecord from '@brand/assets/images/betRecord/mobile/icon_no_bet_record.png'
import arrowUp from '@images/arrow.svg'
import bgImg from '@mixins/backgroundImg'

const RecordContainer = styled.div`
    padding: 10px;
    ${(props) => `
        min-height: calc(100vh - (${props.theme.vars.mobileAppBarHeight} + ${TAB_HEIGHT}px + ${props.theme.vars.mobileHeaderHeight} + ${props.theme.vars.mobileFooterHeight}));
        overflow: auto;
    `}
`

const RecordHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 15px;
    color: ${(props) => props.theme.colors.page.mobile.betRecord.recordHeader.color};
    background: ${(props) => props.theme.colors.page.mobile.betRecord.recordHeader.bgColor};
    ${(props) => props.theme.typography.Body4}
`

const CountDiv = styled.div``

const BetDiv = styled.div``

const WinLoseDiv = styled.div``

const WinLoseText = styled.span<{ isWin: number }>`
    ${(props) => (props.isWin !== 0 ? (props.isWin > 0 ? 'color: #1ebf0e' : 'color: red') : '')};
`

const NoRecordWrapper = styled.div`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NoRecordContainer = styled.div`
    width: 260px;
`

const NoRecordImg = styled.div`
    width: 260px;
    height: 200px;
    ${bgImg(IconNoRecord)}
`

const NoRecordText = styled.div`
    margin-top: 26px;
    color: ${(props) => props.theme.colors.page.mobile.betRecord.noRecordText};
    text-align: center;
    ${(props) => props.theme.typography.Body2}
`

const SScrollMoreContainer = styled.div`
    width: 100%;
    height: 51px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        width: 15px;
        height: 15px;
        margin-left: 10px;
    }
`

export default ({ cardData, loadMore, hasMore, totalRecord, totalWinAmount, totalValidBetAmount }: IRecordProps) => {
    const t = useTranslation()

    const scrollParentRef = useRef<HTMLDivElement>(null)

    return (
        <RecordContainer ref={scrollParentRef}>
            <RecordHeader>
                <CountDiv>{`${t('betRecord.recordCount')}：${totalRecord}`}</CountDiv>
                <BetDiv>{`${t('betRecord.validBetAmount')}：${totalValidBetAmount?.toFixed(2)}`}</BetDiv>
                <WinLoseDiv>
                    {`${t('betRecord.winLoseAmount')}：`}
                    <WinLoseText isWin={totalWinAmount}>{totalWinAmount?.toFixed(2)}</WinLoseText>
                </WinLoseDiv>
            </RecordHeader>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                threshold={1}
                loader={
                    <SScrollMoreContainer key="infinite-scroll-loader">
                        向下滑动显示更多
                        <img src={arrowUp} />
                    </SScrollMoreContainer>
                }>
                {cardData.length === 0 ? (
                    <NoRecordWrapper>
                        <NoRecordContainer>
                            <NoRecordImg />
                            <NoRecordText>{t('betRecord.noRecord')}</NoRecordText>
                        </NoRecordContainer>
                    </NoRecordWrapper>
                ) : (
                    cardData.map((record, index) => <RecordCard key={`record-card-${index}`} cardData={record} />)
                )}
            </InfiniteScroll>
        </RecordContainer>
    )
}
