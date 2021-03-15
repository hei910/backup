import styled from 'styled-components/macro'
import { GameContext } from '@app/gameProvider'
import IframeGameContainer from './iframeGameContainer'
import { useContext, useState, useRef } from 'react'
import Draggable from 'react-draggable'
import useTranslation from '@hooks/useTranslation'
import Modal, { ModalIcons } from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;

    ${RoundedButton} {
        &:not(:first-child) {
            margin-left: 12px;
        }
    }
`

const CircleButton = styled.button`
    position: fixed;
    border: 1px solid ${(props) => props.theme.colors.component.common.gameFloatingButton.borderColor};
    border-radius: 50%;
    padding: 3px;
    background-color: transparent;
    width: 52px;
    height: 52px;
    bottom: 100px;
    right: 8px;
`

const CircleInnerButton = styled.div`
    ${(props) => props.theme.typography.Body6}
    background-color: white;
    border-radius: 50%;
    color: ${(props) => props.theme.colors.component.common.gameFloatingButton.textColor};
    word-break: break-all;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
`

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: left;
    margin-bottom: 40px;
`

const BackToGamePageModal: React.FC<{ isOpen: boolean; closeModal: () => void; onConfirm: () => void }> = ({
    isOpen,
    closeModal,
    onConfirm,
}) => {
    const t = useTranslation()

    return (
        <Modal
            id="app-game-back-to-page-modal"
            icon={ModalIcons.lightbulb}
            title={t('general.components.modal.kindReminder')}
            isOpen={isOpen}
            closeModal={closeModal}>
            <Description>{t('general.components.modal.backToGamePage')}</Description>
            <ButtonContainer>
                <RoundedButton type="button" buttonType="ghost" onClick={closeModal}>
                    {t('general.components.button.cancel')}
                </RoundedButton>
                <RoundedButton type="button" buttonType="secondary" onClick={onConfirm}>
                    {t('general.components.button.confirm')}
                </RoundedButton>
            </ButtonContainer>
        </Modal>
    )
}

export default () => {
    const { closeGame } = useContext(GameContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const timerRef = useRef<any>(null)
    const isDrag = useRef<boolean>(false)
    const t = useTranslation()

    const onStart = () => {
        isDrag.current = false
    }

    const onDrag = () => {
        timerRef.current = setTimeout(() => {
            isDrag.current = true
        }, 100) // more than 100ms trigger dragging
    }

    const onStop = () => {
        if (!isDrag.current) {
            setIsModalOpen(true)

            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
    }
    const onClose = () => {
        setIsModalOpen(false)
    }

    const onConfirm = () => {
        setIsModalOpen(false)
        closeGame()
    }

    return (
        <IframeGameContainer>
            <Draggable bounds="parent" onStart={onStart} onDrag={onDrag} onStop={onStop}>
                <CircleButton>
                    <CircleInnerButton
                        dangerouslySetInnerHTML={{ __html: t('general.components.button.backToGamePage') }}
                    />
                </CircleButton>
            </Draggable>
            <BackToGamePageModal isOpen={isModalOpen} closeModal={onClose} onConfirm={onConfirm} />
        </IframeGameContainer>
    )
}
