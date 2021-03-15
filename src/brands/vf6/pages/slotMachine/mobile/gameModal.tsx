import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import CloseIcon from '@brand/assets/images/slotMachine/mobile/close.svg'
import { BaseModalBackground } from 'styled-react-modal'
import useScrollControl from '@hooks/useScrollControl'

interface IGameModalProps {
    isOpen: boolean
    closeButton: () => void
    children: any
}
const Overlay = styled(BaseModalBackground)`
    background-color: rgba(165, 165, 165, 0.7);
`

const CloseButton = styled.div`
    ${bgImg(CloseIcon)}
    margin: 20px auto;
    width: 48px;
    height: 48px;
`

export default ({ isOpen, closeButton, children }: IGameModalProps) => {
    const { disableScrolling, enableScrolling } = useScrollControl('gameModal')
    useEffect(() => {
        if (isOpen) {
            disableScrolling()
        } else {
            enableScrolling()
        }
    }, [disableScrolling, enableScrolling, isOpen])

    return isOpen ? (
        <Overlay>
            <div>
                {children}
                <CloseButton onClick={closeButton} data-qa="btnGameModalClose" />
            </div>
        </Overlay>
    ) : (
        <></>
    )
}
