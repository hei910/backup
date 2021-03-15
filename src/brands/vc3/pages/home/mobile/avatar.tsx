import { useMemo } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import depositIcon from '@brand/assets/images/home/mobile/icon-deposit.svg'
import withdrawIcon from '@brand/assets/images/home/mobile/icon-withdraw.svg'
import transferIcon from '@brand/assets/images/home/mobile/icon-transfer.svg'
import { directToWithdraw, directToTransfer, directToDeposit, directToMsgCenterNotification, directToMsgCenterInbox, } from '@utils/v1Functions'
import bgImg from '@mixins/backgroundImg'
import defaultAvatar from '@images/header/mobile/Soccer_Messi.png'

const FlexContainer = styled.div`
    display: flex;
`

const Background = styled.div`
    background-color: #0c186c;
    position: sticky;
    top: 0;
    z-index: 99;
`

const Wrapper = styled(FlexContainer)`
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    justify-content: space-between;
    padding: 20px;
`

const SUserIcon = styled(FlexContainer) <{ icon: string }>`
    ${(props) => bgImg(props.icon, 'contain')}
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #0c186c;
    position: relative;
`

const SMessageCount = styled(FlexContainer) <{ oversize: boolean }>`
    position: absolute;
    top: -10px;
    right: ${(props) => props.oversize ? '-10px' : '-5px'};
    width: ${(props) => props.oversize ? '26px' : '16px'};
    height: 16px;
    background-color: #ff6b6b;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
`

const UserInfo = styled(FlexContainer)`
    flex-direction: column;
    justify-content: center;
    padding-left: 6px;
`

const UserInfoText = styled(FlexContainer)`
    ${(props) => props.theme.typography.Subtitle5}
    align-items: center;
    color: #0c186c;
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
    width: 20px;
    height: 18px;
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
    },
    {
        icon: withdrawIcon,
        title: '提现',
        onClick: directToWithdraw,
    },
    {
        icon: transferIcon,
        title: '转账',
        onClick: directToTransfer,
    },
]

const Avatar: React.FC<{}> = () => {
    const username = useSelector((state) => state.user.userProfile.username)
    const userProfileIcon = useSelector((state) => state.user.userProfile.icon)
    const balance = useSelector((state) => state.user.balance)
    const inbox = useSelector((state) => state.user.I);
    const notification = useSelector((state) => state.user.N);
    const msgCount = inbox + notification;

    const balanceText = useMemo(() => {
        return /^[0-9]/.test(balance) ? `CNY ${balance}` : balance
    }, [balance])

    return (
        <Background>
            <Wrapper>
                <FlexContainer>
                    <SUserIcon
                        icon={userProfileIcon ? `${process.env.CDN_DOMAIN || ''}/${userProfileIcon}` : defaultAvatar}
                        onClick={() => notification > 0 ? directToMsgCenterNotification() : directToMsgCenterInbox()}
                    >
                        <SMessageCount oversize={msgCount > 99}>
                            {msgCount > 99 ? '99+' : msgCount}
                        </SMessageCount>
                    </SUserIcon>
                    <UserInfo>
                        <UserInfoText>{username}</UserInfoText>
                        <UserInfoText>{balanceText}</UserInfoText>
                    </UserInfo>
                </FlexContainer>
                <FlexContainer>
                    {links.map((link) => {
                        return (
                            <SLink key={`nav-item-${link.title}`} onClick={link.onClick}>
                                <LinkImg bg={link.icon} />
                                <LinkTitle>{link.title}</LinkTitle>
                            </SLink>
                        )
                    })}
                </FlexContainer>
            </Wrapper>
        </Background>
    )
}

export default Avatar
