import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import CloseIcon from '@brand/assets/images/slotMachine/mobile/close.svg'

interface IGameModalProps {
    isOpen: boolean
    closeButton: () => void
    children: any
}
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(165, 165, 165, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled.div`
    ${bgImg(CloseIcon)}
    margin: 20px auto;
    width: 48px;
    height: 48px;
`

export default ({ isOpen, closeButton, children }: IGameModalProps) => {
    return isOpen ? (
        <Overlay>
            <div>
                {children}
                <CloseButton onClick={closeButton} />
            </div>
        </Overlay>
    ) : (
        <></>
    )
}
