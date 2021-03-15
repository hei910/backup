import { css } from 'styled-components/macro'
import imageSprite from '@mixins/imageSprite'
import backgroundImg from '@mixins/backgroundImg'
export interface IGameTypeItem {
    supplier: string
    className?: string
    isMaintenance: boolean
    isActive: boolean
    title: string
    to: string
}

export interface IGameTypeList {
    gameTypes: IGameTypeItem[]
}

export const GameTypeListCss = (flexWrap: string, overflow: string = 'auto') => css`
    display: flex;
    flex-wrap: ${flexWrap};
    ${flexWrap === 'nowrap' &&
    `
        overflow: ${overflow};
        justify-content: space-between;
    `};
`

export const GameTypeItemCss = (paddingTopBottom: number, minWidth?: number) => css`
    text-align: center;
    text-decoration: none;
    flex: ${minWidth ? `0 0 ${minWidth}px` : ' 1 1 auto'};
    padding: ${`${paddingTopBottom}px`} 0;
`

export const GameTypeIconCss = (width: number, height: number) => css`
    margin: 0 auto;
    width: ${`${width}px`};
    height: ${`${height}px`};
`

/* eslint-disable indent */
export const GameTypeIconBgImgCss = (
    icons: string,
    width: number,
    height: number,
    index: number,
    noActiveIcons: boolean = false,
) => css`
    ${imageSprite({
        url: icons,
        width,
        height,
        itemIndex: index,
        indexMap: noActiveIcons
            ? {
                  default: 0,
              }
            : {
                  default: 1,
                  active: 0,
              },
    })};

    &.maintenance {
        ${backgroundImg(icons, `auto ${height}px`, 'no-repeat', `${width * (noActiveIcons ? -7 : -14)}px 0`)}
    }
`

export const GameTypeIconBgImgCss2 = (icons: string, width: number, height: number, index: number) => {
    return css`
        ${imageSprite({
            url: icons,
            width,
            height,
            itemIndex: index,
            indexMap: {
                default: 1,
                active: 0,
                other: 2,
            },
        })}

        &.maintenance {
            ${imageSprite({
                url: icons,
                width,
                height,
                itemIndex: index,
                indexMap: {
                    default: 1,
                    active: 0,
                    other: 2,
                },
                type: 'other',
            })}
        }
    `
}
