import React from 'react'
import styled from 'styled-components/macro'
import { Platform } from '@services/sportGlobal/types'
import { SportTypeEnum } from '@services/sportLive/types'
import { rotate } from '@sport/styles/common/keyframes'

export interface ILiveVideoProps {
    matchIdFromProps?: string
    sportTypeFromProps?: SportTypeEnum | null
    sourceFromProps?: string | null
}

interface ILiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    isCloseLiveCenter?: boolean
    noLive?: boolean
    isShownVideoNavbar?: boolean
}

export const LiveContainer = styled.div<ILiveContainerProps>`
    display: ${(props) => (props.isShownVideoNavbar ? 'none' : 'block')};
    position: relative;
    background-color: ${(props) => (props.noLive ? '#2d2d2d' : 'black')};
    min-height: ${(props) => (props.isCloseLiveCenter ? '40px' : '220px')};
    width: 100%;
`

export const LoadingSpinContainer = styled.div<{ platform: Platform }>`
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: ${(props) => (props.platform === 'mobile' ? 'none' : '180px')};
    background: black;
    top: 0;
    left: 0;
    z-index: 1;
`

export const LoadingWrapper = styled.div`
    margin: 0 auto;
    position: relative;
    height: 100%;
    width: 100%;

    svg {
        position: absolute;
        width: 50px;
        height: 50px;
        bottom: 50%;
        left: calc(50% - 25px);
        background-size: 50px auto;
        animation: ${rotate} 0.5s steps(50, end) infinite;
    }

    svg path {
        fill: #fff;
        stroke: #fff;
    }
`
