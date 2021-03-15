import styled from 'styled-components/macro'
import { aniHorizontal } from '@sport/styles/common/keyframes'

const MSkeletion = styled.div<{ width?: string | number }>`
    border-radius: 20px;
    animation: ${aniHorizontal} 1.5s linear infinite;
    background: #ccc;
    background-size: 50%;
    width: ${(props) => (props.width ? props.width.toString() : '25')}%;
    height: 25px;
    margin: 10px;
`

export default MSkeletion
