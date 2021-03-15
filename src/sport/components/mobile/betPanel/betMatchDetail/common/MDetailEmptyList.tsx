import React from 'react'
import styled from 'styled-components/macro'

const SEmptyListWrap = styled.div`
    background: ${(props) => props.theme.sport.colors.table.subHeader.background};
    padding: 15px;
    color: ${(props) => props.theme.sport.colors.text.active.secondary};
    font-size: 0.85rem;
`

const MDetailEmptyList: React.FC = () => {
    return <SEmptyListWrap>赛事盘口已关闭</SEmptyListWrap>
}

export default MDetailEmptyList
