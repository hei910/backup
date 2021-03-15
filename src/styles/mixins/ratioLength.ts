import { css, FlattenSimpleInterpolation } from 'styled-components/macro'

export const ratioHeightForMobile = (length: number): FlattenSimpleInterpolation => css`
    height: calc(${length} / 375 * 100vw);
`

export const ratioWidthForMobile = (length: number): FlattenSimpleInterpolation => css`
    width: calc(${length} / 375 * 100vw);
`
