import RegionCompeitionItem from '@sport/components/mobile/betPanel/betMatchFilter/RegionCompetitionItem'
import React from 'react'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'

interface CompetitionMenuProps {}

const SWrap = styled.div`
    border-top: 1px solid ${(props) => props.theme.sport.colors.background};
`

const CompetitionMenu: React.FC<CompetitionMenuProps> = () => {
    const menu = useSelector((state) => state.sportData.seasonList?.menu ?? [])

    const renderMenu = menu.map((item, i) => {
        return <RegionCompeitionItem key={item.name + i} data={item} showBorder={i !== 0} />
    })

    return <SWrap>{renderMenu}</SWrap>
}

export default CompetitionMenu
