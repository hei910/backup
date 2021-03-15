import { SportTypeEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'

interface IFrameContainerProperty {
    title: string
    src: string
    scrolling: string
    isCloseLiveCenter: boolean
    sportType?: SportTypeEnum | null
}

export const StyleIFrame = styled.iframe<IFrameContainerProperty>`
    display: ${(props) => (props.isCloseLiveCenter ? 'none' : '')};
    width: 100%;
    border: 0;
`
