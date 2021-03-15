import { useMemo } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'

import depositIcon from '@brand/assets/images/home/mobile/icon-deposit.svg'
import withdrawIcon from '@brand/assets/images/home/mobile/icon-withdraw.svg'
import transferIcon from '@brand/assets/images/home/mobile/icon-transfer.svg'
import defaultAvatar from '@brand/assets/images/defaultAvatar.png'
import { directToWithdraw, directToTransfer, directToDeposit, directToMsgCenterNotification, directToMsgCenterInbox } from '@utils/v1Functions'
import bgImg from '@mixins/backgroundImg'
import colors from '@styles/colors'

const FlexContainer = styled.div`
    display: flex;
`

const Background = styled.div`
    background-color: #f5f5f5;
    padding: 0px 15px;
`

const Wrapper = styled(FlexContainer)`
    background-color: #ffffff;
    border: 10px;
    justify-content: space-around;
    box-shadow: 2px 2px 6px 0 rgba(255, 132, 12, 0.09);
    align-items: center;
    height: 58px;
    border-radius: 10px;
    padding: 0px 15px;

    > ${FlexContainer} {
        flex: 1;
    }
`

const UserPic = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const UserTextInfo = styled(FlexContainer)`
    flex-direction: column;
    justify-content: center;
    padding-left: 6px;
`

const NavItemSection = styled(FlexContainer)`
    justify-content: center;
`

const UserSection = styled(FlexContainer)`
    height: 46px;
    min-width: 130px;
    padding-right: 5px;
    border-right: solid #ffeddb 1px;
    justify-content: flex-start;
`
const SMessageCount = styled(FlexContainer)<{ oversize: boolean }>`
    position: absolute;
    top: -4px;
    right: ${(props) => (props.oversize ? '-10px' : '-3px')};
    width: ${(props) => (props.oversize ? '26px' : '16px')};
    height: 16px;
    background-color: #ff840c;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
`

const SUserIcon = styled(FlexContainer)<{ icon: string }>`
    ${(props) => bgImg(props.icon, 'contain')}
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid ${colors.brand};
`

const UserInfoText = styled(FlexContainer)`
    ${(props) => props.theme.typography.Subtitle5}
    align-items: center;
    color: ${colors.brand};
`

const SLink = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 30px;

    :last-child {
        padding-right: 0;
    }
`

const LinkImg = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    width: 27px;
    height: 27px;
`

const LinkTitle = styled(UserInfoText)`
    ${(props) => props.theme.typography.Subtitle5}
    justify-content: center;
    padding-top: 6px;
`

const links = [
    {
        icon: depositIcon,
        title: '充值',
        onClick: directToDeposit,
        automationId: 'btnDeposit',
    },
    {
        icon: withdrawIcon,
        title: '提现',
        onClick: directToWithdraw,
        automationId: 'btnWithdraw',
    },
    {
        icon: transferIcon,
        title: '转账',
        onClick: directToTransfer,
        automationId: 'btnTransfer',
    },
]

const Avatar: React.FC<{}> = () => {
    const username = useSelector((state) => state.user.userProfile.username)
    const userProfileIcon = useSelector((state) => state.user.userProfile.icon)
    const balance = useSelector((state) => state.user.balance)
    const inbox = useSelector((state) => state.user.I)
    const notification = useSelector((state) => state.user.N)
    const msgCount = inbox + notification

    const balanceText = useMemo(() => {
        return /^[0-9]/.test(balance) ? `CNY ${balance}` : balance
    }, [balance])

    return (
        <Background>
            <Wrapper>
                <UserSection>
                    <UserPic>
                        <SUserIcon
                            data-qa='btnAvatar'
                            onClick={() => (notification > 0 ? directToMsgCenterNotification() : directToMsgCenterInbox())}
                            icon={userProfileIcon ? `${process.env.CDN_DOMAIN || ''}/${userProfileIcon}` : defaultAvatar}
                        />
                        <SMessageCount oversize={msgCount > 99}>{msgCount > 99 ? '99+' : msgCount}</SMessageCount>
                    </UserPic>
                    <UserTextInfo>
                        <UserInfoText data-qa='txtUsername'>{username}</UserInfoText>
                        <UserInfoText data-qa='txtBal'>{balanceText}</UserInfoText>
                    </UserTextInfo>
                </UserSection>

                <NavItemSection>
                    {links.map((link) => {
                        return (
                            <SLink key={`nav-item-${link.title}`} onClick={link.onClick} data-qa={link.automationId}>
                                <LinkImg bg={link.icon} />
                                <LinkTitle>{link.title}</LinkTitle>
                            </SLink>
                        )
                    })}
                </NavItemSection>
            </Wrapper>
        </Background>
    )
}

export default Avatar
