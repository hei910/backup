import LeagueItem from '@sport/components/common/betList/leagueItem'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from '@sport/stores'
import { updateFilterMatchList } from '@services/sportBet/actions'
import { CompetitionInfo } from '@services/sportData/types'
import styled from 'styled-components/macro'

interface RegionCompeitionItemProps {
    data: CompetitionInfo
    showBorder: boolean
    // selectMatchStatus?: string;
}

const LeagueItemWrap = styled.div<{ showBorder?: boolean }>`
    border-top: ${(props) => (props.showBorder ? `1px solid ${props.theme.sport.colors.background}` : null)};
    width: 100%;
`

const RegionCompeitionItem: React.FC<RegionCompeitionItemProps> = ({ data, showBorder }) => {
    const history = useHistory()
    const { date, sports, matchsStatus } = useCustomParams()
    const dispatch = useDispatch()
    const competitionIds = data.competitionId ?? data.competitionIds ?? []

    const onItemClick = useCallback(() => {
        const isTodaOrTomorrow = data.matchStatus && data.matchStatus.length > 0

        if (isTodaOrTomorrow) {
            data.matchStatus && data.matchStatus === 'Today'
                ? history.push(`/sport/select-competition/today/${sports}`)
                : history.push(`/sport/select-competition/future/${sports}`)
        } else {
            dispatch(updateFilterMatchList(competitionIds))
            history.push(`/sport/${date}/${sports}/${competitionIds}${matchsStatus ? `/${matchsStatus}` : ''}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.matchStatus, sports, competitionIds, date, matchsStatus])

    return (
        <LeagueItemWrap showBorder={showBorder}>
            <LeagueItem matchNum={data.count} onItemClick={onItemClick} isMobile>
                {data.name}
            </LeagueItem>
        </LeagueItemWrap>
    )
}

export default memo(RegionCompeitionItem)
