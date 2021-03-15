/* eslint-disable indent */
import { useCallback, useState, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/macro'
import {
    IRecordCardProps,
    IExpandedRecordProps,
    IExpandedGames,
    IGames,
    IExpandedSportGames,
    ISportGames,
} from '../types'
import useTranslation from '@hooks/useTranslation'
import { sportsName } from '../constants'
import useCommonInit from '@pages/betRecord/hook'
import BetRecordModal from '@pages/betRecord/betRecordModal'
import BetRecordSettlePopUp from '@pages/betRecord/betRecordSettlePopUp'

const RecordCardWrapper = styled.div<{ isExpandEarlySettle: boolean }>`
    position: relative;
    /* padding: 15px; */
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
    ${(props) => props.theme.typography.Body4}
    padding: ${(props) => (props.isExpandEarlySettle ? '15px 15px 60px 15px' : '15px')};
`

const RecordCardContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const BetDetails = styled.div`
    color: #000000;
`

const BetContentDiv = styled.div<{ dangerouslySetInnerHTML?: { __html: string } }>`
    margin-top: 3px;
`

const BetTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle4}
`

const BetTeams = styled.span`
    color: red;
`

const BetAmount = styled.span`
    color: #1ebf0e;
`

const BtnExpand = styled.div`
    color: #000;
    width: 20px;
    text-align: center;
    ${(props) => props.theme.typography.H2Headline}
`

const ExpandedContainer = styled.div`
    margin-top: 5px;
    border-top: 1px solid #e6e6e6;
`

const ExpandedBetDetails = styled(BetDetails)`
    margin-top: 15px;
`

const BetID = styled.span`
    color: #999999;
`

const ResultDiv = styled.div`
    position: absolute;
    bottom: 5px;
    right: 15px;
`

const ProcessDiv = styled.span`
    color: red;
    font-weight: bold;
`

const CancelledDiv = styled(BetTitle)``
const SportsResultContainer = styled.div`
    position: absolute;
    bottom: 15px;
    right: 15px;
    left: 15px;
`
const GameResultDiv = styled.div`
    text-align: right;
`
const EarlyBetResultButton = styled.div`
    text-align: center;
    margin: auto;
    border-radius: 20px;
    background: #444444;
    padding: 5px 15px;
    color: #fff;
    width: 160px;
    margin-top: 10px;
`

const ExpandedGames = ({ title, gameCode, date }: IExpandedGames) => {
    return (
        <ExpandedContainer>
            <ExpandedBetDetails>
                {title !== '' && <BetTitle>{title}</BetTitle>}
                <BetContentDiv>{gameCode}</BetContentDiv>
                <BetContentDiv>{date}</BetContentDiv>
            </ExpandedBetDetails>
        </ExpandedContainer>
    )
}

const ExpandedSportGames = ({
    teams,
    seasonName,
    marketName,
    outcomeNameNSpecifier,
    odds,
    matchStatus,
    startTime,
    sportCodeText,
    betRecordId,
    betDateTime,
    gameSupplier,
    processed,
    normalSettleTBC,
    isParlay,
    isOr,
}: IExpandedSportGames) => {
    const t = useTranslation()

    return isParlay ? ( //串
        <ExpandedContainer>
            <ExpandedBetDetails>
                <BetContentDiv>{teams}</BetContentDiv>
                <BetContentDiv>{seasonName}</BetContentDiv>
                {gameSupplier !== 'avia' && <BetContentDiv>{marketName}</BetContentDiv>}
                <BetContentDiv>
                    <BetTeams>{outcomeNameNSpecifier}</BetTeams>
                    {' @ '}
                    <BetTeams>{odds}</BetTeams>
                </BetContentDiv>
                <BetContentDiv>{matchStatus}</BetContentDiv>
                <BetContentDiv>{startTime}</BetContentDiv>
            </ExpandedBetDetails>
        </ExpandedContainer>
    ) : (
        //單
        <ExpandedContainer>
            <ExpandedBetDetails>
                <BetTitle>{seasonName}</BetTitle>
                {!isOr && <BetContentDiv>{startTime}</BetContentDiv>}
                <BetContentDiv>
                    {sportCodeText}:<BetID> {betRecordId}</BetID>
                </BetContentDiv>
                <BetContentDiv>{betDateTime}</BetContentDiv>
                {!isOr &&
                    (gameSupplier === 'sportV1'
                        ? !processed && (
                              <BetContentDiv>
                                  {`${t('betRecord.status')}: `}
                                  <ProcessDiv>
                                      {normalSettleTBC ? t('betRecord.confirmTBC') : t('betRecord.confirm')}
                                  </ProcessDiv>
                              </BetContentDiv>
                          )
                        : !processed && (
                              <BetContentDiv>
                                  {`${t('betRecord.status')}: `}
                                  <ProcessDiv>{t('betRecord.confirm')}</ProcessDiv>
                              </BetContentDiv>
                          ))}
            </ExpandedBetDetails>
        </ExpandedContainer>
    )
}

const ExpandedPart = ({ expandCardData, gameType, getStatus }: IExpandedRecordProps) => {
    const t = useTranslation()

    const sportsExpandedData = useMemo(() => {
        return {
            sportCodeText: t('betRecord.sportCode'),
            parlayTitle: expandCardData.mobileParlayTitle,
            betRecordId: expandCardData.betRecordId,
            betDateTime: expandCardData.betDateTime,
            expandedSportsDetail: expandCardData.sportsData?.sportsDetail.map((match) => {
                let matchStatus = ''
                if (gameType === 'sportV2' && match.status.toLowerCase() === ('dangerous_cancel' || 'cancel')) {
                    matchStatus = `${t('betRecord.cancelled')} ${getStatus(match.status)}`
                } else if (gameType === 'sportV1' && match.cancelReason) {
                    matchStatus = `${t('betRecord.cancelled')} ${match.cancelReason}`
                } else if (expandCardData.processed) {
                    matchStatus = `${getStatus(match.winLoseStatus)} (${t('betRecord.sportResult')}: ${
                        match.score.homeScore
                    } - ${match.score.awayScore})`
                }
                return {
                    teams: match.homeTeam && match.awayTeam ? `${match.homeTeam} vs ${match.awayTeam}` : '',
                    seasonName: match.seasonName,
                    marketName: match.marketName,
                    outcomeNameNSpecifier:
                        gameType === 'sportV1' || gameType === 'avia'
                            ? match.outcomeName
                            : `${match.outcomeName} ${match.specifier}`,
                    odds: match.odds,
                    matchStatus: matchStatus,
                    startTime: dayjs(match.startTime).format('YYYY-MM-DD HH:mm:ss'),
                    isOr: match.isOr,
                }
            }),
            gameSupplier: expandCardData.gameSupplier,
            processed: expandCardData.processed,
            normalSettleTBC: expandCardData.sportsData?.normalSettleTBC,
        }
    }, [
        expandCardData.betDateTime,
        expandCardData.betRecordId,
        expandCardData.gameSupplier,
        expandCardData.mobileParlayTitle,
        expandCardData.processed,
        expandCardData.sportsData,
        gameType,
        getStatus,
        t,
    ])

    const isParlay = useMemo(() => {
        return (expandCardData.sportsData?.sportsDetail.length as number) > 1 ? true : false
    }, [expandCardData.sportsData])

    const expandedData = useMemo(() => {
        let gameCode = ''
        if (expandCardData.gameSupplier === 'bg' || expandCardData.gameSupplier === 'ag') {
            gameCode = `${t('betRecord.gameCode')}: ${expandCardData.gameCode}`
        } else if (expandCardData.gameSupplier === 'loto') {
            gameCode = `${t('betRecord.detail')}: ${expandCardData.betRecordId}`
        } else {
            gameCode = `${t('betRecord.lotteryNumber')}: ${expandCardData.betRecordId}`
        }
        return {
            title:
                expandCardData.gameSupplier === 'bg' || expandCardData.gameSupplier === 'ag'
                    ? t('betRecord.detail')
                    : '',
            gameCode: gameCode,
            date: `${t('betRecord.date')}: ${expandCardData.betDateTime}`,
        }
    }, [
        expandCardData.betDateTime,
        expandCardData.betRecordId,
        expandCardData.gameCode,
        expandCardData.gameSupplier,
        t,
    ])

    return (
        <>
            {(gameType === 'sportV2' || gameType === 'sportV1' || gameType === 'avia') &&
                sportsExpandedData?.expandedSportsDetail?.map((match, index) => {
                    return (
                        <ExpandedSportGames
                            {...match}
                            sportCodeText={sportsExpandedData.sportCodeText}
                            betRecordId={sportsExpandedData.betRecordId}
                            gameSupplier={sportsExpandedData.gameSupplier}
                            processed={sportsExpandedData.processed}
                            normalSettleTBC={sportsExpandedData.normalSettleTBC}
                            key={index}
                            isParlay={isParlay}
                            betDateTime={sportsExpandedData.betDateTime}
                            getStatus={getStatus}
                        />
                    )
                })}
            {isParlay && (
                <ExpandedContainer>
                    <ExpandedBetDetails>
                        <BetContentDiv>{sportsExpandedData.parlayTitle}</BetContentDiv>
                        <BetContentDiv>
                            {sportsExpandedData.sportCodeText}:<BetID> {sportsExpandedData.betRecordId}</BetID>
                        </BetContentDiv>
                        <BetContentDiv>{sportsExpandedData.betDateTime}</BetContentDiv>
                    </ExpandedBetDetails>
                </ExpandedContainer>
            )}
            {!(gameType === 'sportV2' || gameType === 'sportV1' || gameType === 'avia') && (
                <ExpandedGames {...expandedData} />
            )}
        </>
    )
}

const Games = ({ title, winLose, cancelled, children }: IGames) => {
    return (
        <>
            <BetTitle>{title}</BetTitle>
            {children}
            {!cancelled && <BetContentDiv>{winLose}</BetContentDiv>}
        </>
    )
}

const SportGames = ({
    title,
    team,
    betAmount,
    processed,
    cancelled,
    estimatedWinnings,
    sportsDetail,
    gameSupplier,
    oldStatus,
    status,
    isOr,
    winLose,
    isParlay,
}: ISportGames) => {
    const t = useTranslation()

    return (
        <>
            <BetTitle>{title}</BetTitle>
            {!isParlay && <BetContentDiv>{team}</BetContentDiv>}
            <BetContentDiv>
                {!isOr ? (
                    sportsDetail?.map((match, i) => {
                        return (
                            <div key={`OutcomeNameNSpecifier-${i}`}>
                                <BetTeams>{`${match.outcomeName} ${
                                    gameSupplier === 'sportV1' || gameSupplier === 'avia' ? '' : match.specifier
                                }`}</BetTeams>
                                {` @ `}
                                <BetTeams>{match.odds}</BetTeams>
                            </div>
                        )
                    })
                ) : (
                    <>
                        <BetTitle>{sportsDetail[0].specifier}</BetTitle>
                        {`(${sportsDetail[0].marketName}) `}
                        <BetTeams>{sportsDetail[0].outcomeName}</BetTeams>
                        {' @ '} <BetTeams>{sportsDetail[0].odds}</BetTeams>
                    </>
                )}
            </BetContentDiv>
            <BetContentDiv>
                {t('betRecord.betAmount')}:<BetAmount> {betAmount.toFixed(2)}</BetAmount>
            </BetContentDiv>
            {!cancelled &&
                (!isOr ? (
                    !processed ? (
                        <BetContentDiv>
                            {`${t('betRecord.canWinAmount')}: ${
                                estimatedWinnings === null ? '--' : estimatedWinnings?.toFixed(2)
                            }`}
                        </BetContentDiv>
                    ) : (
                        <BetContentDiv>{winLose}</BetContentDiv>
                    )
                ) : oldStatus === 'settle' ? ( //champion
                    <BetContentDiv>{winLose}</BetContentDiv>
                ) : (
                    oldStatus === 'unsettle' && (
                        <BetContentDiv>
                            {`${t('betRecord.canWinAmount')}: ${
                                estimatedWinnings === null ? '--' : estimatedWinnings?.toFixed(2)
                            }`}
                        </BetContentDiv>
                    )
                ))}
            {!isOr ? (
                !isParlay && cancelled ? (
                    <CancelledDiv>{`${t('betRecord.cancelled')} ${
                        gameSupplier === 'sportV1' ? sportsDetail[0].cancelReason : status
                    }`}</CancelledDiv>
                ) : null
            ) : (
                <CancelledDiv>{sportsDetail[0].cancelReason}</CancelledDiv>
            )}
        </>
    )
}

export default ({ cardData }: IRecordCardProps) => {
    const t = useTranslation()
    const { onClickEarlySettleMock, isEarlyBetModalOpen, onClickModalHandler, onClickEarlySettle } = useCommonInit()
    const [isExpand, setIsExpand] = useState(false)

    const onExpandClick = useCallback(() => {
        setIsExpand(!isExpand)
    }, [isExpand])

    const expandSign = useMemo(() => {
        return isExpand ? '-' : '+'
    }, [isExpand])

    const getWinLoseString = useCallback(
        (showAmount) => {
            if (cardData.netProfit > 0) {
                return `${t('betRecord.win')}${showAmount ? `: ${cardData.netProfit.toFixed(2)}` : ''}`
            } else if (cardData.netProfit === 0) {
                return t('betRecord.draw')
            } else {
                return `${t('betRecord.lose')}${showAmount ? `: ${Math.abs(cardData.netProfit).toFixed(2)}` : ''}`
            }
        },
        [cardData.netProfit, t],
    )

    const getSportsName = useCallback(
        (type) => {
            if (type === sportsName.soccer) {
                return t('betRecord.soccer')
            } else if (type === sportsName.baseBall) {
                return t('betRecord.baseball')
            } else if (type === sportsName.tennis) {
                return t('betRecord.tennis')
            } else if (type === sportsName.basketBall) {
                return t('betRecord.basketball')
            }
        },
        [t],
    )
    const getStatus = useCallback(
        (status) => {
            if (status === 'DANGEROUS_CANCEL') {
                return t('betRecord.status.dangerouscancel')
            } else if (status === 'CANCEL') {
                return t('betRecord.status.cancel')
            } else if (status === 'WINNER') {
                return t('betRecord.status.win')
            } else if (status === 'LOSER') {
                return t('betRecord.status.lose')
            } else if (status === 'HALFWIN') {
                return t('betRecord.status.halfwin')
            } else if (status === 'HALFLOSE') {
                return t('betRecord.status.halflose')
            } else if (status === 'PUSHED') {
                return t('betRecord.status.draw')
            } else {
                return ''
            }
        },
        [t],
    )

    useEffect(() => {
        return () => {
            setIsExpand(false)
        }
    }, [cardData])

    const gameTitle = useMemo(() => {
        return cardData.gameSupplier === 'loto'
            ? `${cardData.gameTypeName} ${t('betRecord.lotteryPeriod', {
                  gameCode: cardData.gameCode || '',
              })}`
            : cardData.gameTypeName
    }, [cardData.gameCode, cardData.gameSupplier, cardData.gameTypeName, t])

    const isParlay = useMemo(() => {
        return (cardData.sportsData?.sportsDetail.length as number) > 1 ? true : false
    }, [cardData.sportsData])

    const sportsTeam = useMemo(() => {
        if (cardData.gameSupplier === 'sportV2') {
            return cardData.sportsData?.sportsDetail[0].homeTeam && cardData.sportsData?.sportsDetail[0].awayTeam
                ? `${cardData.sportsData?.sportsDetail[0].homeTeam} vs ${cardData.sportsData?.sportsDetail[0].awayTeam}`
                : ''
        } else if (cardData.gameSupplier === 'sportV1') {
            return cardData.sportsData?.sportsDetail[0].specifier
        }
        return ''
    }, [cardData.gameSupplier, cardData.sportsData])

    const sportUIData = useMemo(() => {
        return {
            title:
                cardData.gameSupplier === 'avia'
                    ? cardData.gameTypeName
                    : isParlay
                    ? cardData.comboGamePlayName
                    : `${getSportsName(cardData.sportsData?.sportsDetail[0].sportType)}${cardData.gamePlayName}`,
            team: cardData.gameSupplier === 'avia' ? cardData.sportsData?.sportsDetail[0].match : sportsTeam,
            betAmount: cardData.betAmount,
            processed: cardData.processed,
            cancelled: cardData.cancelled || cardData.sportsData?.sportsDetail[0].cancelReason !== '',
            estimatedWinnings: cardData.sportsData?.estimatedWinnings ? cardData.sportsData?.estimatedWinnings : 0,
            sportsDetail: cardData.sportsData?.sportsDetail ? cardData.sportsData?.sportsDetail : [],
            gameSupplier: cardData.gameSupplier,
            oldStatus: cardData.sportsData?.sportsDetail[0].status,
            status: getStatus(cardData.sportsData?.sportsDetail[0].status),
            isOr: cardData.sportsData?.sportsDetail[0].isOr,
            winLose: getWinLoseString(true),
            isParlay: isParlay,
        }
    }, [
        cardData.betAmount,
        cardData.cancelled,
        cardData.comboGamePlayName,
        cardData.gamePlayName,
        cardData.gameSupplier,
        cardData.gameTypeName,
        cardData.processed,
        cardData.sportsData,
        getSportsName,
        getStatus,
        getWinLoseString,
        isParlay,
        sportsTeam,
    ])

    const isUnsettledOr = useMemo(() => {
        return (
            cardData.sportsData?.sportsDetail[0].isOr &&
            !cardData.cancelled &&
            cardData.sportsData?.sportsDetail[0].status === 'unsettle'
        )
    }, [cardData.cancelled, cardData.sportsData])

    const isSingle = useMemo(() => {
        return (
            cardData.sportsData?.sportsDetail.length === 1 &&
            !cardData.cancelled &&
            !cardData.sportsData?.sportsDetail[0].isOr
        )
    }, [cardData.cancelled, cardData.sportsData])

    const rowId = cardData?.sportsData?.rowId
    const masterId = cardData?.sportsData?.masterId
    const allowEarlySettle = cardData?.sportsData?.allowEarlySettle ?? false

    return (
        <RecordCardWrapper isExpandEarlySettle={allowEarlySettle && isExpand}>
            <RecordCardContainer>
                <BetDetails>
                    {(cardData.gameSupplier === 'sportV2' ||
                        cardData.gameSupplier === 'sportV1' ||
                        cardData.gameSupplier === 'avia') && <SportGames {...sportUIData} isParlay={isParlay} />}
                    {cardData.gameSupplier !== 'sportV1' &&
                        cardData.gameSupplier !== 'sportV2' &&
                        cardData.gameSupplier !== 'avia' && (
                            <Games title={gameTitle} winLose={getWinLoseString(true)} cancelled={cardData.cancelled}>
                                {(cardData.gameSupplier === 'bg' || cardData.gameSupplier === 'ag') && (
                                    <BetContentDiv>
                                        {t('betRecord.betRecordId')}: {cardData.betRecordId}
                                    </BetContentDiv>
                                )}
                                {cardData.gameSupplier === 'loto' && (
                                    <>
                                        {t('betRecord.gameRule')}:
                                        <span dangerouslySetInnerHTML={{ __html: cardData.gamePlayName || '' }} />
                                    </>
                                )}
                                <BetContentDiv>
                                    {t('betRecord.betAmount')}:<BetAmount> {cardData.betAmount.toFixed(2)}</BetAmount>
                                    {(cardData.gameSupplier === 'ky' || cardData.gameSupplier === 'nn') && (
                                        <>
                                            <BetContentDiv>{`${t('betRecord.detail')}: ${
                                                cardData.betRecordId
                                            }`}</BetContentDiv>
                                            <BetContentDiv>{`${t('betRecord.date')}: ${
                                                cardData.betDateTime
                                            }`}</BetContentDiv>
                                        </>
                                    )}
                                </BetContentDiv>
                            </Games>
                        )}
                </BetDetails>
                {!(cardData.gameSupplier === 'nn' || cardData.gameSupplier === 'ky') && (
                    <BtnExpand onClick={onExpandClick}>{expandSign}</BtnExpand>
                )}
                {(cardData.gameSupplier === 'bg' || cardData.gameSupplier === 'ag') && (
                    <ResultDiv>
                        {t('betRecord.gameResult')}:{getWinLoseString(false)}
                    </ResultDiv>
                )}
            </RecordCardContainer>
            {isExpand && (
                <ExpandedPart expandCardData={cardData} gameType={cardData.gameSupplier} getStatus={getStatus} />
            )}
            {(cardData.gameSupplier === 'sportV2' || cardData.gameSupplier === 'sportV1') && (
                <SportsResultContainer>
                    {(isUnsettledOr || isSingle) && (
                        <GameResultDiv>
                            {`${t('betRecord.sportResult')}:
                        ${
                            !cardData.processed
                                ? '-'
                                : `${cardData.sportsData?.sportsDetail[0].score.homeScore ?? ''} - ${
                                      cardData.sportsData?.sportsDetail[0].score.awayScore ?? ''
                                  }`
                        }`}
                        </GameResultDiv>
                    )}
                    {isExpand && allowEarlySettle && (
                        <EarlyBetResultButton onClick={() => onClickEarlySettleMock({ rowId, masterId })}>
                            提前结算详情
                        </EarlyBetResultButton>
                    )}
                    {isEarlyBetModalOpen && (
                        <BetRecordModal isOpen={isEarlyBetModalOpen} closeButton={onClickModalHandler}>
                            <BetRecordSettlePopUp
                                data={cardData}
                                onClickEarlySettle={() => onClickEarlySettle({ rowId, masterId })}
                                onClickEarlySettleMock={() => onClickEarlySettleMock({ rowId, masterId })}
                            />
                        </BetRecordModal>
                    )}
                </SportsResultContainer>
            )}
        </RecordCardWrapper>
    )
}
