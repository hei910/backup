import { css, FlattenSimpleInterpolation, keyframes } from 'styled-components/macro'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export default (second: number = 2): FlattenSimpleInterpolation =>
    css`
        animation: ${rotate} ${second}s linear infinite;
    `