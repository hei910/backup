import { css, FlattenSimpleInterpolation } from 'styled-components/macro'
import bgImg from './backgroundImg'

interface imageSpriteProps {
    url: string
    width: number
    height: number
    itemIndex: number
    indexMap?: {
        default: number
        hover?: number
        active?: number
        other?: number
    }
    type?: 'active' | 'other'
}

export default ({ url, width, height, itemIndex, indexMap, type }: imageSpriteProps): FlattenSimpleInterpolation => {
    const groupSize = indexMap ? Object.keys(indexMap).length : 1
    const getPosition = (stateIndex: number) => width * -1 * groupSize * itemIndex - width * stateIndex
    const targetType = type || 'default'

    return css`
        ${bgImg(url, `auto ${height}px`, 'no-repeat', `${getPosition(indexMap?.[targetType] || 0)}px 0`)}
        ${indexMap?.hover !== undefined && targetType === 'default'
        ? `
            &:hover {
                background-position: ${getPosition(indexMap.hover)}px 0;
            }
        `
        : ''}
        ${indexMap?.active !== undefined && targetType !== 'other'
        ? `
            &.active {
                background-position: ${getPosition(indexMap.active)}px 0;
            }
        `
        : ''}
    `
}
