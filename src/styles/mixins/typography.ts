import { css, FlattenSimpleInterpolation } from 'styled-components/macro'

export default (fontSize: number, lineHeight: number, fontWeight = 'normal'): FlattenSimpleInterpolation =>
    css`
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        line-height: ${lineHeight / fontSize};
    `
