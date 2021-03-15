import React from 'react'
import styled from 'styled-components/macro'

const SEmptyListWrap = styled.div`
    background: ${(props) => props.theme.sport.colors.table.subHeader.background};
    padding: 15px;
    color: ${(props) => props.theme.sport.colors.text.active.secondary};
    font-size: 0.85rem;
`

const MEmptyList: React.FC = () => {
    return <SEmptyListWrap>您选择的日期尚未开设任何联赛</SEmptyListWrap>
}

export default MEmptyList
