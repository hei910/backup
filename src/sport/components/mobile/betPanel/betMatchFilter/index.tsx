import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from '@sport/stores'
import { CountryCompetitionInfoWithType } from '@services/sportData/types'
import { toggleBetFilterList } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import RegionCompeitionItem from './RegionCompetitionItem'

interface MBetMatchFilterProps {
    data: CountryCompetitionInfoWithType[]
}

interface MBetMatchFilterItemProps {
    isOpen: Boolean
    data: CountryCompetitionInfoWithType
}

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.sport.colors.nav.menu.background.active};
`

const MBetMatchFilterContainer = styled.div`
    background: ${(props) => props.theme.sport.colors.text.background};
    padding-top: 8px;
    margin-top: -8px;
`

const SFilterItemWrap = styled.div`
    background: ${(props) => props.theme.sport.colors.text.background};
    margin-top: 8px;
`

const MBetMatchFilterItem: React.FC<MBetMatchFilterItemProps> = ({ data, isOpen }) => {
    const dispatch = useDispatch()
    const { sports = 'football' } = useCustomParams()
    const collapsedList = useSelector((state) => state.sportGlobal.betFilterCollapsedInfo.list)

    const onHeaderClick = useCallback(() => {
        dispatch(toggleBetFilterList(sports, `${data.type}-${data.name}`, !isOpen))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, data, sports])

    return (
        <SFilterItemWrap>
            <ExpandableHeader
                title={data.name}
                onClick={onHeaderClick}
                defaultShow={!collapsedList.includes(`${data.type}-${data.name}`)}>
                {isOpen && (
                    <ItemContainer>
                        {data.competitions &&
                            data.competitions.map((competition, i) => (
                                <RegionCompeitionItem
                                    key={`RegionCompeitionItem-${data.name}-${competition.name}-${competition.competitionId}-${i}`}
                                    showBorder={i !== 0}
                                    data={competition}
                                />
                            ))}
                    </ItemContainer>
                )}
            </ExpandableHeader>
        </SFilterItemWrap>
    )
}

const MBetMatchFilter: React.FC<MBetMatchFilterProps> = ({ data }) => {
    const collapsedList = useSelector((state) => state.sportGlobal.betFilterCollapsedInfo.list)
    const { sports } = useCustomParams()

    return (
        <MBetMatchFilterContainer>
            {data &&
                data.map((country) => (
                    <MBetMatchFilterItem
                        data={country}
                        key={`filter-league-group-${sports}-${country.type}-${country.name}`}
                        isOpen={!collapsedList.includes(`${country.type}-${country.name}`)}
                    />
                ))}
        </MBetMatchFilterContainer>
    )
}

// eslint-disable-next-line import/no-unused-modules
export default memo(MBetMatchFilter)
