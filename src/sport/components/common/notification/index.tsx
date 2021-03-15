import { CloseIcon } from '@sport/components/icons'
import ScrollView from '@sport/components/mobile/scrollView'
import React from 'react'
import { animated, useTransition } from 'react-spring'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { toggleShowNotification } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'

interface NotificationView {
    children: any
}

const SScrollView = styled(ScrollView)`
    overflow-y: scroll;
    height: calc(100% + 1px);
`

const SNotificationBackground = styled(animated.div)`
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
`

const SNotificationItemWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0;
    z-index: 11;
    display: flex;
    justify-content: center;
`

const SNotificationItemContainer = styled(animated.div)`
    position: relative;
    /* left: 50vw;
    transform: translateX(50%); */
    margin-top: 20px;
    background: #323232;
    /* width: 26.5px; */
    color: #fff;
`

const SCloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`

const SCloseIcon = styled(CloseIcon)`
    path {
        fill: #fff;
    }

    cursor: pointer;
`

const SChildren = styled.div`
    margin-right: 24px;
`

const Notification: React.FC<NotificationView> = ({ children }) => {
    const isShowNotification = useSelector((store) => store.sportGlobal.showNotification)
    const dispatch = useDispatch()

    const transitions = useTransition(isShowNotification, null, {
        from: { opacity: 0, top: 50 },
        enter: { opacity: 1, top: 0 },
        leave: { opacity: 0, top: 50 },
    })

    function onClose() {
        dispatch(toggleShowNotification(false))
    }

    return (
        <>
            {transitions.map(({ item, key, props }) => {
                return (
                    item && (
                        <SScrollView key={key} open={isShowNotification}>
                            <SNotificationBackground style={{ opacity: props.opacity }} onClick={onClose} />
                            <SNotificationItemWrapper>
                                <SNotificationItemContainer style={{ top: props.top }}>
                                    <div>
                                        <SCloseButton>
                                            <SCloseIcon onClick={onClose} />
                                        </SCloseButton>
                                        <SChildren>{children}</SChildren>
                                    </div>
                                </SNotificationItemContainer>
                            </SNotificationItemWrapper>
                        </SScrollView>
                    )
                )
            })}
        </>
    )
}

export default React.memo(Notification)
