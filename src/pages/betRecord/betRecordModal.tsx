import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { BaseModalBackground } from 'styled-react-modal'
import bgImg from '@styles/mixins/backgroundImg'
import CloseIcon from '@images/betRecord/cross_icon.svg'
import useScrollControl from '@hooks/useScrollControl'

interface IBetRecordModalProps {
    isOpen: boolean
    closeButton: () => void
    children: any
}
const SOverlay = styled(BaseModalBackground)`
    background-color: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.overlayColor};
    z-index: ${(props) => props.theme.vars.modalOverlayZIndex};
`

const CloseButton = styled.div`
    ${bgImg(CloseIcon)}
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
`

const SModalContainer = styled.div`
    min-width: 250px;
    max-width: 380px;
    background: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.primaryBgColor};
    border-radius: 15px;
    position: relative;
`
const SBar = styled.div`
    border-right: 3px solid ${(props) => props.theme.colors.brand};
    height: 25px;
`
const SModalHeaderContainer = styled.div`
    padding: 15px;
    background: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.headerBg};
    display: flex;
    align-items: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`
const SModalHeader = styled.div`
    color: ${(props) => props.theme.colors.page.common.betRecord.popUpModal.headerColor};
    margin-left: 10px;
    ${(props) => props.theme.typography.Body1};
`
export default ({ isOpen, closeButton, children }: IBetRecordModalProps) => {
    const { disableScrolling, enableScrolling } = useScrollControl(`betRecordModal`)

    useEffect(() => {
        if (isOpen) {
            disableScrolling()
        } else if (!isOpen) {
            enableScrolling()
        }
        return () => enableScrolling()
    }, [disableScrolling, enableScrolling, isOpen])
    return (
        <>
            {isOpen && (
                <SOverlay>
                    <SModalContainer>
                        <SModalHeaderContainer>
                            <SBar />
                            <SModalHeader>提前結算</SModalHeader>
                            <CloseButton onClick={closeButton} data-qa="btnBetRecordModalClose" />
                        </SModalHeaderContainer>
                        {children}
                    </SModalContainer>
                </SOverlay>
            )}
        </>
    )
}
