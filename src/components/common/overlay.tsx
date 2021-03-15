import styled from 'styled-components/macro'
import { BaseModalBackground } from 'styled-react-modal'
import { animationDuration } from './baseModal'

const AppModalOverlay = styled(BaseModalBackground)<{ opacity: number }>`
    z-index: ${(props) => props.theme.vars.modalOverlayZIndex};
    opacity: ${(props) => props.opacity};
    transition: opacity ${animationDuration}s ease-in-out;
`
export default AppModalOverlay
