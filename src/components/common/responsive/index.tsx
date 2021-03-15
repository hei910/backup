import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components/macro'

const minVh = 500
const maxVh = 1000
const baseFontSize = 16

interface AbRWrapperProps {
    className?: string
    params?: paramsProps
}

interface paramsProps {
    minVh?: number
    maxVh?: number
    baseFontSize?: number
}

interface WrapperProps {
    minVh: number
    maxVh: number
    baseFontSize: number
}

const Wrapper = styled.div<WrapperProps>`
    font-size: ${(props) => (props.baseFontSize * 100) / props.maxVh + 'vh'};

    @media only screen and (min-height: ${(props) => props.maxVh}px) {
        font-size: ${(props) => props.baseFontSize}px;
    }
`

export const AbRWrapper: React.FC<AbRWrapperProps> = ({ children, className, params }) => {
    const finalParams = {
        minVh,
        maxVh,
        baseFontSize,
        ...params,
    }

    return (
        <Wrapper className={className} {...finalParams}>
            {children}
        </Wrapper>
    )
}
export const px = (...px: (number | string)[]): string => {
    return px
        .join(' ')
        .toString()
        .split(' ')
        .map((val) => val.split('px')[0])
        .map((val) => (!isNaN(+val) ? +val / baseFontSize + 'em' : val))
        .join(' ')
}

export const range = (
    property: string,
    min: number,
    max: number,
    min_vh = minVh,
    max_vh = maxVh,
): FlattenSimpleInterpolation =>
    /* this function is for setting min and max value upon viewport size change */
    css`
        ${`${property}: ${min}px;`}

        @media screen and (min-height: ${min_vh}px) {
            ${`${property}: calc(${min}px + ${max - min} * ((100vh - ${min_vh}px) / ${max_vh - min_vh}));`}
        }
        @media screen and (min-height: ${max_vh}px) {
            ${`${property}: ${max}px;`}
        }
    `

export const fs = (val: number): FlattenSimpleInterpolation => {
    return css`
        ${range('font-size', 12, val)}
    `
}
