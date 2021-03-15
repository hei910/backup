import Popover, { Message, PopoverContantWrap } from '@sport/components/common/popover'
import IconButton from '@sport/components/mobile/iconButton'
import { IconWrapper, InfoIcon, RemoveBtnIcon } from '@sport/components/icons'
import dayjs from 'dayjs'
import React, { memo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@redux'
import { BetListStatus } from '@services/sportBet/types'
import { FixtureStatus, Score } from '@services/sportData/types'
import styled, { css } from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { matchStatusMap, teamMap } from '@sport/util/dictionary'
import { isEmptyObject } from '@sport/util/general'
import { getSingleBetLimit } from '@sport/util/getBetLimit'

interface BetListHeaderProps {
    serializedCombinedID: string
    removeBet?: () => void
}

interface ParlayDisabledHightlightProps {
    parlayDisabled: boolean
}

const Wrapper = styled.div`
    display: flex;
    height: auto;
    justify-content: space-between;
    align-items: center;
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 25px);
`

const Title = styled.div`
    color: ${(props) => props.theme.sport.colors.text.active.primary};
`

const CurrentScore = styled.div`
    font-size: 14px;
    padding-left: 5px;
    text-align: center;
    vertical-align: middle;
    color: #999;
    flex-shrink: 0;
`

const InfoGroup = styled.div`
    display: flex;
    align-items: center;
`

const InfoButton = styled(IconButton)`
    margin-left: 0px;
    border-radius: 2px;
    /* background: ${(props) => props.theme.sport.colors.betList.header.infoIcon.background}; */
    background: #5a5a5a;

    svg rect,
    circle,
    path,
    g {
        /* fill: ${(props) => props.theme.sport.colors.betList.header.infoIcon.text}; */
        fill: #fff;
        stroke: ${(props) => props.theme.sport.colors.betList.header.infoIcon.text};
        transition: all 0.15s ease-in-out;
    }

    @media (hover: hover) {
        &:hover {
            background: ${(props) => props.theme.sport.colors.betList.header.infoIcon.hoverBackground};

            svg rect,
            circle,
            path,
            g {
                fill: ${(props) => props.theme.sport.colors.betList.header.infoIcon.hoverText};
                stroke: ${(props) => props.theme.sport.colors.betList.header.infoIcon.hoverText};
                transition: all 0.15s ease-in-out;
            }
        }
    }
`

const SHoverInfoGroup = css`
    ${InfoGroup}:hover & {
        opacity: 1;
        visibility: visible;
        transform: translate(0, 10px);
    }
`

const SDesktopPopoverStyled = styled(Popover)<{ top?: number; isTabletLayout?: boolean }>`
    ${SHoverInfoGroup}
    top: ${(props) => (props.isTabletLayout ? (props.top ?? 0) - 25 : 0)}px;

    @media ${device.desktop} {
        width: 20vw;
        max-width: 320px;
    }
`

const SMobilePopoverStyled = styled(Popover)`
    ${SHoverInfoGroup}
    top: 0;

    @media ${device.desktop} {
        min-width: 30vw;
        max-width: 35vw;
    }

    @media ${device.tablet} {
        min-width: 30vw;
        max-width: 35vw;
    }

    @media ${device.mobile} {
        min-width: 80vw;
        max-width: 90vw;
    }
`

const RemoveButton = styled(IconWrapper)`
    cursor: pointer;
`

const ParlayDisabledHightlight = styled.div<Pick<ParlayDisabledHightlightProps, 'parlayDisabled'>>`
    color: ${(prop) =>
        prop.parlayDisabled
            ? prop.theme.sport.colors.text.active.secondary
            : prop.theme.sport.colors.text.active.primary};
    background-color: ${(prop) => (prop.parlayDisabled ? prop.theme.sport.colors.error : 'transparent')};
    border-radius: 5px;
    font-weight: bold;
    padding: 0 3px;

    @media ${device.tablet} {
        font-size: 15px;
    }
`

const PopoverContant: React.FC<{ id: string; team: string; datetime: string; messages?: string[] }> = ({
    id,
    team,
    datetime,
    messages = [],
}) => {
    const messagesElements = messages.map((messageString, index) => {
        return <Message key={`popover-${index}-${id}`}>{messageString}</Message>
    })

    return (
        <PopoverContantWrap>
            {!team.startsWith('undefined') && <Message>{team}</Message>}
            <Message>{datetime}</Message>
            {messagesElements}
        </PopoverContantWrap>
    )
}

const BetListHeader: React.FC<BetListHeaderProps> = ({ serializedCombinedID, removeBet }) => {
    // const marketCode = useSelector((store) => store.sportBet.data[serializedCombinedID]?.marketCode)
    const status = useSelector((store) => store.sportBet.data[serializedCombinedID]?.status) ?? FixtureStatus.Pre
    const isLive = useSelector((store) => store.sportBet.data[serializedCombinedID]?.status === FixtureStatus.Live)
    const score = useSelector((store) => store.sportBet.data[serializedCombinedID]?.score)
    // const sportType = useSelector((store) => store.sportBet.data[serializedCombinedID]?.sportType)
    const seasonName = useSelector((store) => store.sportBet.data[serializedCombinedID]?.seasonName)
    const marketCode = useSelector((store) => store.sportBet.data[serializedCombinedID]?.marketCode)
    const competitors = useSelector((store) => store.sportBet.data[serializedCombinedID]?.competitors)
    const startTime = useSelector((store) => store.sportBet.data[serializedCombinedID]?.startTime) ?? +new Date()
    const marketName = useSelector((store) => store.sportBet.data[serializedCombinedID]?.marketName)
    const headerTitle = useSelector((store) => store.sportBet.data[serializedCombinedID]?.header)
    const inSameMatchList = useSelector((store) => store.sportBet.sameMatchList.includes(serializedCombinedID))
    const inOrSameSeasonList = useSelector((store) => store.sportBet.orSameSeasonList.includes(serializedCombinedID))
    const platform = useSelector((store) => store.sportGlobal.platform)
    const hasParlay = useSelector((store) => store.sportBet.data[serializedCombinedID]?.hasParlay)
    const sportType = useSelector((store) => store.sportBet.data[serializedCombinedID]?.sportType.toLowerCase())
    const isTabletLayout = useSelector((state) => state.sportGlobal.isTabletLayout)
    const notification = useSelector((state) => state.sportNotification.data.length > 0 && platform === 'desktop')

    const sportLimits = useSelector((store) => store.sportRules)

    const singleBetLimit = getSingleBetLimit(sportLimits, status, sportType?.toLowerCase(), marketCode)

    const showScore = isLive && !isEmptyObject(score)
    const isBetting = useSelector((state) => state.sportBet.betListStatus === BetListStatus.BETTING)
    const isFailed = useSelector((state) => state.sportBet.betListStatus === BetListStatus.FAILED)
    const getScore = (s: Score) => ({
        home: s.home ?? s.homeScore,
        away: s.away ?? s.awayScore,
    })
    const homeTeam = teamMap('h', competitors)
    const awayTeam = teamMap('a', competitors)
    const showTeams = homeTeam !== '' && awayTeam !== ''
    const teamsString = showTeams ? `${homeTeam} vs ${awayTeam}` : ''
    const { t } = useTranslation()

    const [top, setTop] = useState(0)

    const ref = useRef<HTMLDivElement>(null)

    const onMouseOver = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setTop(event?.clientY ?? 0)
    }

    let betAnteLimit = 100000
    // let betMatchLimit = 500000

    if (singleBetLimit) {
        betAnteLimit = singleBetLimit
        // betMatchLimit = limits.singleMatchLimit || betMatchLimit
    }

    const messages: string[] = []

    if (platform === 'mobile') {
        messages.push(`${t('betList.singleMaxStake')}: ${betAnteLimit.toFixed(2)} ${t('betList.currencyCode')}`)
        // messages.push(`${t('betList.matchMaxStake')}: ${betMatchLimit.toFixed(2)} ${t('betList.currencyCode')}`)
    }

    const popoverInfo = {
        title: seasonName,
        contant: (
            <PopoverContant
                id={serializedCombinedID}
                team={teamsString}
                datetime={`${dayjs(startTime).format('DD/MM')} ${dayjs(startTime).format('HH:mm')}`}
                messages={messages}
            />
        ),
    }

    return (
        <Wrapper>
            <TitleWrapper>
                <InfoGroup ref={ref} onMouseEnter={onMouseOver}>
                    {platform === 'desktop' ? (
                        <SDesktopPopoverStyled
                            top={notification ? top - 30 : top}
                            info={popoverInfo}
                            isTabletLayout={isTabletLayout}
                            position={isTabletLayout ? 'static' : 'relative'}
                        />
                    ) : (
                        <SMobilePopoverStyled info={popoverInfo} position="relative" />
                    )}

                    <InfoButton size={18}>
                        <InfoIcon />
                    </InfoButton>
                </InfoGroup>

                <Title>
                    <ParlayDisabledHightlight
                        parlayDisabled={isBetting && (inSameMatchList || inOrSameSeasonList || !hasParlay)}>
                        <span>{t(matchStatusMap[isLive ? FixtureStatus.Live : status])}</span>
                        <span>{headerTitle ?? marketName}</span>
                    </ParlayDisabledHightlight>
                </Title>
                <CurrentScore>{showScore && `(${getScore(score).home}-${getScore(score).away})`}</CurrentScore>
            </TitleWrapper>
            <div>
                {(isBetting || (platform === 'mobile' && isFailed)) && (
                    <RemoveButton size={18} onClick={removeBet}>
                        <RemoveBtnIcon />
                    </RemoveButton>
                )}
            </div>
        </Wrapper>
    )
}

export default memo(BetListHeader)
