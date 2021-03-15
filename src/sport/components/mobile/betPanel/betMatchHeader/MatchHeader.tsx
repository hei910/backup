import { IconWrapper, MobileBackToArrow } from '@sport/components/icons'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from '@sport/stores'
import { setRestoreScrollPosition, updateDisplayOptions } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import { sportTypeCodeMap } from '@sport/util/dictionary'
import SearchBar from './SearchBar'

interface ComponentProps {}

type DisplayType = 'football' | 'basketball'

const SHeaderContainer = styled.div`
    background: ${(props) => props.theme.sport.colors.betMatchHeader.background};
    width: 100%;
    /* border-bottom: 1px solid ${(props) => props.theme.sport.colors.betMatchHeader.border}; */
    user-select: none;
    box-shadow: 0 2.5px 7.5px 0 rgba(0, 0, 0, 0.1);
`

const SHeaderSubContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    min-height: 50px;
    justify-content: space-between;
`

const SLeftContainer = styled.div`
    display: flex;
    flex: 0 1 1;
    min-width: 75px;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`

// const SActiveText = styled.div`
//     color: ${props => props.theme.sport.colors.text.active.primary};
// `;

const SSportTypeText = styled.div<{ isInplay?: boolean }>`
    color: ${(props) => props.theme.sport.colors.text.tertiary};
    font-weight: bold;
    font-size: 18px;
`

const SRightContainer = styled.div`
    display: flex;
    flex: 1 1 1;
    align-items: center;
    justify-content: end;
`

const SRightBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 60px;
`

const SButtonL = styled.button<{ active?: boolean }>`
    height: 30px;
    width: 100%;
    min-width: 70px;
    background: ${(props) =>
        props.active ? props.theme.sport.colors.accent : props.theme.sport.colors.button.background};
    font-size: 14px;
    font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
    color: ${(props) =>
        props.active ? props.theme.sport.colors.text.active.secondary : props.theme.sport.colors.text.tertiary};
    border: none;
    border-radius: 60px 0 0 60px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 120ms ease-in;
`

const SButtonR = styled(SButtonL)`
    border-radius: 0 60px 60px 0;
`

const SMobileBackToArrowWrap = styled(IconWrapper)`
    margin-right: 10px;
`

const FullHalfBtn: React.FC = memo(() => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { sports = '', isSelectCompetition, isOutrightPage } = useCustomParams()
    // const [init, setInit] = useState(false)

    const showSearchBar = useSelector((state) => state.sportGlobal.showSearchBar)

    const halvesView = useSelector((state) => {
        if (Object.keys(state.sportGlobal.displayOptions).includes(sports)) {
            return state.sportGlobal.displayOptions?.[sports as DisplayType]?.halvesView
        } else {
            return undefined
        }
    })

    const isTabletLayout = useSelector((state) => state.sportGlobal.isTabletLayout)

    const show =
        !showSearchBar && !isSelectCompetition && !isOutrightPage && halvesView !== undefined && !isTabletLayout

    const onClick = (active: boolean) => {
        dispatch(updateDisplayOptions({ halvesView: active }, sports as DisplayType))
    }

    // const transition = useTransition(show, null, {
    //     from: { width: 0, opacity: 0 },
    //     enter: { width: 141, opacity: 1 },
    //     leave: { width: 0, opacity: 0 },
    //     immediate: !init,
    //     config: {
    //         mass: 1,
    //         tension: 300,
    //         clamp: true,
    //     },
    // })

    // useEffect(() => {
    //     const timeoutHandler = setTimeout(() => setInit(true), 500)
    //     return () => {
    //         clearTimeout(timeoutHandler)
    //     }
    // })

    // const child = transition.map(
    //     ({ item, key, props }) =>
    //         item && (
    //             <animated.div style={props} key={key}>
    //                 <SRightBtnContainer>
    //                     <SButtonL onClick={() => onClick(false)} active={!halvesView}>
    //                         {t('betPanel.full')}
    //                     </SButtonL>
    //                     <SButtonR onClick={() => onClick(true)} active={halvesView}>
    //                         {t('betPanel.half')}
    //                     </SButtonR>
    //                 </SRightBtnContainer>
    //             </animated.div>
    //         ),
    // )

    if (!show) {
        return null
    }

    return (
        <SRightBtnContainer>
            <SButtonL onClick={() => onClick(false)} active={!halvesView}>
                {t('betPanel.full')}
            </SButtonL>
            <SButtonR onClick={() => onClick(true)} active={halvesView}>
                {t('betPanel.half')}
            </SButtonR>
        </SRightBtnContainer>
    )
})

const MatchHeader: React.FC<ComponentProps> = memo(() => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { date = 'all', sports = '', leagueId, isOutrightPage, isSelectCompetition, matchsStatus } = useCustomParams()
    const isInplay = date === 'inplay'
    const location = useLocation()
    const history = useHistory()
    const backToPage = useSelector((state) => state.sportGlobal.backToPage)

    const showGoBackIcon =
        (leagueId?.length && date !== 'upcoming') ||
        date === 'all' ||
        date === 'parlay-Live' ||
        date === 'parlay-Today' ||
        backToPage === 'home'
    const enableSearchBar = !(date === 'outright' && !isSelectCompetition)
    const onGoBack = () => {
        dispatch(setRestoreScrollPosition(true))
        if (backToPage === 'home') {
            history.push(`/sport/home`)
        } else {
            if (date.includes('parlay')) {
                history.push(`/sport/select-competition/parlay/${sports}`)
            } else if (date === 'future') {
                history.push(`/sport/select-competition/${date}/${sports}/${matchsStatus}`)
            } else if (location.pathname.includes('select-competition')) {
                history.push(`/sport/home`)
            } else {
                history.push(`/sport/select-competition/${date}/${sports}`)
            }
        }
    }

    const renderTitle = () => {
        return isOutrightPage ? t('menu.date.outright') : t(sportTypeCodeMap[`${sports}`])
    }

    return (
        <SHeaderContainer>
            <SHeaderSubContainer>
                <SLeftContainer>
                    {showGoBackIcon && (
                        <SMobileBackToArrowWrap size={16} onClick={onGoBack}>
                            <MobileBackToArrow />
                        </SMobileBackToArrowWrap>
                    )}
                    {isInplay && <SSportTypeText>{t('matchStatus.live')}</SSportTypeText>}
                    <SSportTypeText isInplay={isInplay}>{renderTitle()}</SSportTypeText>
                </SLeftContainer>
                <SRightContainer>
                    {enableSearchBar && <SearchBar />}
                    <FullHalfBtn />
                </SRightContainer>
            </SHeaderSubContainer>
        </SHeaderContainer>
    )
})

export default MatchHeader
