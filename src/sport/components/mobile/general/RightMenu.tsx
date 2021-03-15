import CloseButton from '@sport/assets/img/mobile/back_btn.png'
import ScrollView from '@sport/components/mobile/scrollView'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { useSelector } from '@sport/stores'
import { toggleShowRightMenu } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import { goBackOldVersion } from '@sport/util/general'

// Styled & interface
interface MobileRightMenuProps {}

const RightMenuContainer = styled(animated.div)`
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
`

const CloseWrapper = styled.img`
    top: 15px;
    right: 15px;
    height: 15px;
    width: 15px;
`

const RightMenuItemContainer = styled(animated.div)`
    position: fixed;
    top: 0;
    z-index: 11;
    background: #323232;
    width: 264.5px;
    height: 100vh;
`

const SMask = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: calc(100vw - 264.5px);
`

const SMenuItem = styled.div`
    height: 54px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
`

const RightMenuItemSubContainer = styled.div`
    /* margin: 0px 15px 15px 15px; */
`

const SMenuTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    height: 58px;
    align-items: center;
    padding: 0 12px;
    border-bottom: 0.5px solid rgba(89, 89, 89, 0.5);
`

const SProfile = styled.div`
    display: flex;
    align-items: center;
`

const SProfileIcon = styled.img`
    height: 42px;
    width: 42px;
`

const SProfileInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    font-size: 13px;
    color: #fff;
`

const SBalance = styled.div`
    font-size: 16px;
    font-weight: bold;
`

const SEvenColumn = styled.div`
    flex: 2;
`

const SMenuImgLayout = styled.div`
    height: 54px;
    width: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SMenuImg = styled.img`
    height: 17px;
    width: 17px;
`

const SMenuText = styled.div`
    height: 100%;
    display: flex;
    flex: 2;
    align-items: center;
    color: #fff;
    font-size: 13px;
    border-bottom: 0.5px solid rgba(89, 89, 89, 0.5);
`

const SCountLayout = styled.div`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
`

const SCount = styled.div`
    display: flex;
    font-size: 11px;
    background: #fff;
    justify-content: center;
    align-items: center;
    width: 17px;
    height: 17px;
    border-radius: 50%;
`

const SScrollView = styled(ScrollView)``

const MobileRightMenu: React.FC<MobileRightMenuProps> = () => {
    // const [isBetShow, setBetShow] = useState(false);
    const player = useSelector((state) => state.sportPlayer)
    const user = useSelector((state) => state.user)
    const showRightMenu = useSelector((state) => state.sportGlobal.showRightMenu)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const history = useHistory()

    const transitions = useTransition(showRightMenu, null, {
        from: { position: 'absolute', opacity: 0, right: -264.5 },
        enter: { opacity: 1, right: 0 },
        leave: { opacity: 0, right: -264.5 },
    })

    const openBetRecord = () => {
        // setBetShow(!isBetShow);
        dispatch(toggleShowRightMenu(false))
        history.push('/sport/bet-records')
    }

    const toggleShowMenu = () => {
        dispatch(toggleShowRightMenu(!showRightMenu))
    }

    const closeMenu = () => {
        dispatch(toggleShowRightMenu(false))
    }

    const menuListItems = [
        {
            key: 'betRecord',
            icon: require('../../../assets/img/mobile/icon_betRecord.png'),
            name: t('rightMenu.betRecord'),
            action: openBetRecord,
            count: 0,
        },
        {
            key: 'goToOldVersion',
            icon: require('../../../assets/img/mobile/icon_betRecord.png'),
            name: t('rightMenu.goback'),
            action: () => goBackOldVersion(),
            count: 0,
        },
    ]

    return (
        <>
            {transitions.map(({ item, key, props }) => {
                return (
                    item && (
                        <SScrollView open={showRightMenu} key={key}>
                            <RightMenuContainer style={{ opacity: props.opacity }}>
                                <SMask onClick={closeMenu} />
                            </RightMenuContainer>

                            <RightMenuItemContainer style={{ right: props.right }}>
                                <RightMenuItemSubContainer>
                                    <SMenuTopBar>
                                        <SProfile>
                                            <SProfileIcon
                                                src={require('../../../assets/img/mobile/img_personal_info.png')}
                                                alt=""
                                            />
                                            <SProfileInfoLayout>
                                                <SEvenColumn>
                                                    {player.username ? player.username : t('rightMenu.loginText')}
                                                </SEvenColumn>
                                                <SEvenColumn>
                                                    <SBalance>￥ {user.balance}</SBalance>
                                                </SEvenColumn>
                                            </SProfileInfoLayout>
                                        </SProfile>
                                        <CloseWrapper src={CloseButton} alt="" onClick={toggleShowMenu} />
                                    </SMenuTopBar>

                                    {menuListItems.map((item) => {
                                        return (
                                            <SMenuItem key={item.key} onClick={item.action}>
                                                <SMenuImgLayout>
                                                    <SMenuImg src={item.icon} />
                                                </SMenuImgLayout>
                                                <SMenuText>{item.name}</SMenuText>
                                                {item.count !== 0 && (
                                                    <SCountLayout>
                                                        <SCount>{item.count}</SCount>
                                                    </SCountLayout>
                                                )}
                                            </SMenuItem>
                                        )
                                    })}
                                </RightMenuItemSubContainer>
                            </RightMenuItemContainer>
                        </SScrollView>
                    )
                )
            })}
        </>
    )
}

export default MobileRightMenu
