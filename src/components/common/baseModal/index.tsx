import { createContext, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Modal from 'styled-react-modal'
import Header from './header'
import Body from './body'
import { BaseModalProps } from './types'
import useScrollControl from '@hooks/useScrollControl'
import crossImage from '@images/modal/close.png'
import bgImg from '@mixins/backgroundImg'

export const animationDuration = 0.4
const animationDistance = 10

type ModalState = 'hidden' | 'opening' | 'closing'

interface IStyledModalProps {
    overflowVisible?: boolean
    modalState: ModalState
}

type BaseModalType = React.FC<BaseModalProps> & {
    Header: React.FC<any>
    Body: React.FC<any>
}

const StyledModal: any = Modal.styled`
    width: ${process.env.APP_PLATFORM === 'mobile' ? 300 : 340}px;
    border-radius: 5px;
    background-color: #ffffff;
    overflow: ${(props: IStyledModalProps) => (props.overflowVisible ? 'visible' : 'hidden')};
    position: relative;
    transition: transform ${animationDuration}s ease-in-out;
    transform: translateY(${(props: IStyledModalProps) => {
        switch (props.modalState) {
            case 'hidden':
                return `-${animationDistance}px`
            case 'opening':
                return 0
            case 'closing':
                return `${animationDistance}px`
        }
    }});
`

export const Cross = styled.div`
    position: absolute;
    top: 20px;
    right: 16px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    ${bgImg(crossImage)}
`

export const ModalContext = createContext(() => {})

const BaseModal: BaseModalType = ({ id, isOpen, closeModal, children, overflowVisible, className }) => {
    const { enableScrolling, disableScrolling } = useScrollControl(id)
    const [modalState, setModalState] = useState<ModalState>('hidden')

    useEffect(() => {
        if (process.env.APP_PLATFORM === 'mobile') {
            isOpen ? disableScrolling() : enableScrolling()
        }

        return () => {
            enableScrolling()
        }
    }, [isOpen, enableScrolling, disableScrolling])

    const afterOpen = useCallback(() => {
        // wait 0.1s for dom rendering
        setTimeout(() => setModalState('opening'), 100)
    }, [])

    const beforeClose = useCallback(() => {
        return new Promise((resolve) => {
            setModalState('closing')
            setTimeout(resolve, animationDuration * 1000)
        })
    }, [])

    const afterClose = useCallback(() => {
        setModalState('hidden')
    }, [])

    return (
        <ModalContext.Provider value={closeModal}>
            <StyledModal
                className={className}
                data-qa={id}
                isOpen={isOpen}
                onEscapeKeydown={closeModal}
                overflowVisible={overflowVisible}
                backgroundProps={{ opacity: modalState === 'opening' ? 1 : 0 }}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                afterClose={afterClose}
                modalState={modalState}
                allowScroll>
                <Cross onClick={closeModal} data-qa="btnCloseAlert" />
                {children}
            </StyledModal>
        </ModalContext.Provider>
    )
}

BaseModal.Header = Header
BaseModal.Body = Body

export default BaseModal
