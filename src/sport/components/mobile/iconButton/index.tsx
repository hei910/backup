import BaseButton from '@sport/components/mobile/baseButton'
import styled from 'styled-components/macro'

const IconButton = styled(BaseButton)<{ size?: string | number }>`
    width: ${(props) => props.size ?? 25}px;
    height: ${(props) => props.size ?? 25}px;
    padding: 3px;
`

export default IconButton
