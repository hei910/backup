// Essential for all components
import MenuIcon from '@sport/assets/img/mobile/svg/icon_logouted.svg'
import LoginIcon from '@sport/assets/img/mobile/svg/top_login.svg'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '@redux'
import { toggleShowRightMenu } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'

// Interface
interface MobileHeaderProps {}

// Styled Components

const MobileHeaderContainer = styled.div`
    height: 50px;
    width: 100%;
    background: ${(props) => props.theme.sport.colors.header.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MobileHeaderSubContainer = styled.div`
    height: 98%;
    /* width: 100%; */
    margin: 0 1vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const LogoWrapper = styled.img`
    width: auto;
    height: 100%;
`

const RightWrapper = styled.div`
    width: 83px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

const LoginWrapper = styled(LogoWrapper)`
    height: 37px;
    width: 37px;
`

const SBrandImage = styled.img`
    margin-left: 10px;
`

const SLogoWrapper = styled.div`
    padding: 5px 0px;
    height: 100%;
`

const MenuWrapper = styled(LoginWrapper)``

const SLoginButton = styled.a`
    height: 37px;
    margin-right: 5px;
`

const MobileHeader: React.FC<MobileHeaderProps> = () => {
    const user = useSelector((state) => state.sportPlayer)
    const dispatch = useDispatch()
    const setting = useSelector((state) => state.sportSetting)

    const openMenu = () => dispatch(toggleShowRightMenu(true))

    const brandImage = setting?.setting?.['BRAND_IMAGE']

    return (
        <MobileHeaderContainer>
            <SLogoWrapper>
                <SBrandImage src={brandImage} />
            </SLogoWrapper>
            <MobileHeaderSubContainer>
                <RightWrapper>
                    {!user.username && (
                        <SLoginButton href={'/login'}>
                            <LoginWrapper src={LoginIcon} />
                        </SLoginButton>
                    )}
                    <MenuWrapper src={MenuIcon} onClick={openMenu} />
                </RightWrapper>
            </MobileHeaderSubContainer>
        </MobileHeaderContainer>
    )
}

export default MobileHeader
