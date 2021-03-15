import dayjs from 'dayjs'
import 'dayjs/locale/id'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import useCustomParams from '@sport/hooks/useCustomParams'
import { mix } from 'polished'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@redux'
import { MatchesDate } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { langToISOCode } from '@sport/util/constant'
import { getDefaultDate } from '@sport/util/dataProcess'

interface CompetitionDateItemProps {
    matchDate: MatchesDate
    onClick?: (date: string) => void
    other?: boolean
    title?: string
    selected?: boolean
}

const SRootWrap = styled.div`
    overflow-x: auto;
    border-top: 1px solid ${(props) => props.theme.sport.colors.background};
    background: ${(props) => props.theme.sport.colors.text.background};
`

const SCompetitionFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
    float: left;
`

const SCompetitionDateItem = styled.div<{ selected?: boolean }>`
    box-shadow: ${(props) =>
        props.selected
            ? `0 2.5px 8px 0 ${mix(0.5, props.theme.sport.colors.accent, 'rgba(0, 0, 0, 0.1)')}`
            : props.theme.sport.boxShadow};
    border-radius: 8px;
    min-width: 70px;
    height: 40px;
    margin: 10px 8px;
    background: ${(props) =>
        props.selected ? props.theme.sport.colors.accent : props.theme.sport.colors.text.background};
    color: ${(props) =>
        props.selected ? props.theme.sport.colors.text.active.secondary : props.theme.sport.colors.text.tertiary};
    text-align: center;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SDay = styled.span`
    font-size: 13px;
    font-weight: 600;
`

const SWeek = styled.span`
    font-size: 12px;
`

const CompetitionItem: React.FC<CompetitionDateItemProps> = memo(({ matchDate, other, title, selected, onClick }) => {
    const language = useSelector((state) => state.sportGlobal.language)
    const lang = langToISOCode[language]
    const { date = 'all', sports = 'football' } = useCustomParams()
    const { t } = useTranslation()

    const history = useHistory()
    // const parlayDate = matchDate.date === 'parlay-Today' ? 'parlayToday' : 'parlayLive'

    const selectDate = () => {
        onClick && onClick(matchDate.matchsDate)
        const matchDateParams = matchDate.matchsDate
        if (matchDateParams === 'parlay-Today' || matchDateParams === 'parlay-Live') {
            history.push(`/sport/${matchDateParams}/${sports}`)
        } else {
            history.replace(`/sport/select-competition/${date}/${sports}/${matchDateParams}`)
        }
    }

    const getformattedDate = () => {
        let formattedWeek
        let formattedDay
        if (matchDate.date === 'Today') {
            formattedDay = t('competition.todaysMatches')
            formattedWeek = ''
        } else if (other) {
            if (date === 'future') {
                formattedDay = t('competition.future')
            } else {
                formattedDay = t('competition.other')
            }
            formattedWeek = ''
        } else if (date === 'parlay') {
            if (matchDate.date === 'parlay-Live') {
                formattedDay = t('competition.live')
            } else if (matchDate.date === 'parlay-Today') {
                formattedDay = t('competition.today')
            }
            formattedWeek = ''
        } else {
            const found = matchDate.date.match(/\d{4}-\d{2}-\d{2}/gm)
            const isVaild = found && found.length > 0
            const date = isVaild && found ? found[0] : ''
            const tDay = dayjs(date, 'YYYY-MM-DD').locale(lang).format('MM/DD')
            const tWeek = dayjs(date, 'YYYY-MM-DD').locale(lang).format('dddd')

            formattedDay = !isVaild ? title : tDay
            formattedWeek = !isVaild ? '' : tWeek
        }

        return { formattedDay, formattedWeek }
    }

    const { formattedDay, formattedWeek } = getformattedDate()

    return (
        <SCompetitionDateItem selected={selected} onClick={selectDate}>
            <SDay>{formattedDay}</SDay>
            <SWeek>{formattedWeek}</SWeek>
        </SCompetitionDateItem>
    )
})

const CompetitionFilter: React.FC = () => {
    const dateList = useSelector((state) => state.sportData.dateList ?? [])

    const {
        date = 'all',
        sports = 'football',
        matchsStatus = date === 'parlay' ? 'parlay-Early' : 'Pre',
    } = useCustomParams()
    const { t } = useTranslation()

    const defaultDate = getDefaultDate(dateList, date, matchsStatus)

    const preMatchStatus = date === 'parlay' ? 'parlay-Early' : 'Pre'

    const [selectedCompetitonDate, setSelectedCompetitonDate] = useState(defaultDate)

    const changeCompetitonDate = (matchDate: string) => {
        setSelectedCompetitonDate(matchDate)
    }

    useEffect(() => {
        setSelectedCompetitonDate(defaultDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultDate, date, sports])

    return (
        <SRootWrap>
            <SCompetitionFilterContainer>
                {date !== 'future' && date !== 'parlay' && (
                    <CompetitionItem
                        matchDate={{ date: 'all', matchsDate: preMatchStatus }}
                        title={t('competition.allMatches')}
                        selected={selectedCompetitonDate === preMatchStatus}
                        onClick={() => changeCompetitonDate(preMatchStatus)}
                    />
                )}
                {/* <CompetitionItem matchDate="inplay" title={'滚球赛事'} /> */}
                {/* <CompetitionItem
                    matchDate={{ date: 'today', matchsDate: 'Today' }}
                    title={t('competition.todaysMatches')}
                    selected={selectedCompetitonDate === 'today'}
                    onClick={() => changeCompetitonDate('today')}
                /> */}
                {dateList &&
                    dateList.map((matchDate, i) => (
                        <CompetitionItem
                            key={`${matchDate.date}-${i}`}
                            matchDate={matchDate}
                            other={i === dateList.length - 1}
                            selected={selectedCompetitonDate === matchDate.matchsDate}
                            onClick={() => changeCompetitonDate(matchDate.matchsDate)}
                        />
                    ))}
                {/* {date !== 'future' && (
                    <CompetitionItem
                        matchDate="future"
                        title={'早盘'}
                        selected={selectedCompetitonDate === 'future'}
                        onClick={changeCompetitonDate}
                    />
                )} */}
            </SCompetitionFilterContainer>
        </SRootWrap>
    )
}

export default memo(CompetitionFilter)
