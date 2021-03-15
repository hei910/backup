import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import bg from '@brand/assets/images/regionBlock/desktop/bg.jpg'
import logo from '@brand/assets/images/regionBlock/desktop/logo.png'
import logoBg from '@brand/assets/images/regionBlock/desktop/logo-bg.png'
import chatBoxIcon from '@images/regionBlock/chat-box.png'
import chatIcon from '@images/regionBlock/icon-chat.png'
import phoneIcon from '@images/regionBlock/icon-phone.png'
import mailIcon from '@images/regionBlock/icon-mail.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'

import bgImg from '@mixins/backgroundImg'
import { directToHomePage } from '@utils/v1Functions'

const Bg = styled.div`
    ${bgImg(bg, 'cover')}
    position: relative;
    width: 100%;
    height: 100%;
    min-height: ${(props) => props.theme.vars.desktopBreakpointHeight};
`

const LogoBg = styled.div`
    ${bgImg(logoBg, 'cover')}
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 157px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 50%;
    width: 100%;
`

const BottomContainer = styled.div`
    background-color: rgba(18, 18, 18, 0.35);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
    width: 100%;
`

const Logo = styled.div`
    ${bgImg(logo, 'contain')}
    height: 96px;
    width: 416px;
`

const Description = styled.div`
    ${(props) => props.theme.typography.Body1};
    color: #ffffff;
    padding: 8px 14px 0;
`

const SpecialColorDescription = styled.span`
    ${(props) => props.theme.typography.Body1}
    color: #ffa33d;
`

const WarningText = styled.div`
    width: 100%;
    text-align: center;
    text-shadow: 0 0 6px #f18f1d;
    font-size: 46px;
    font-weight: bold;
    color: #ffa33d;
    padding-top: 21px;
`

const IpText = styled(Description)`
    text-align: center;
    padding: 4px 0 0;
`

const CsBtn = styled.a`
    ${(props) => props.theme.typography.Body1};
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background-color: #ffa33d;
    color: #ffffff;
    margin-top: 16px;
    padding: 12px 120px;
`

const CsIcon = styled.img`
    padding-right: 6px;
    height: fit-content;
`

const Contacts = styled.div`
    width: 100%;
    padding: 20px 0 0;
`

const Contact = styled.div`
    ${(props) => props.theme.typography.Body1};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    width: 100%;
    padding: 4px 0 0;
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const { complaintPhone, csPhone, csLink, webEmail } = useSelector((state) => state.app.brandInfo)

    const contacts = [
        {
            icon: chatIcon,
            title: t('regionBlock.contacts.csPhone'),
            content: csPhone,
        },
        {
            icon: phoneIcon,
            title: t('regionBlock.contacts.complaintPhone'),
            content: complaintPhone,
        },
        {
            icon: mailIcon,
            title: t('regionBlock.contacts.email'),
            content: webEmail,
        },
    ]

    return (
        <Bg>
            <TopContainer>
                <LogoBg>
                    <Logo onClick={directToHomePage} />
                </LogoBg>
            </TopContainer>
            <BottomContainer>
                <WarningText>ACCESS RESTRICTED</WarningText>
                <Description>
                    {t('regionBlock.dear')}:
                    <br />
                    {t('regionBlock.description.1')}
                    <SpecialColorDescription>{t('regionBlock.description.specialColor')}</SpecialColorDescription>
                    {t('regionBlock.description.2')}
                    <br />
                    {t('regionBlock.description.3')}
                </Description>
                <IpText>
                    {t('regionBlock.ipText')}：{ip}
                </IpText>
                <CsBtn href={csLink}>
                    <CsIcon src={chatBoxIcon} alt={t('regionBlock.cs')} />
                    {t('regionBlock.cs')}
                </CsBtn>
                <Contacts>
                    {contacts.map((contact) => {
                        return (
                            contact.content && (
                                <Contact key={contact.title}>
                                    <CsIcon src={contact.icon} alt={contact.title} />
                                    {contact.title}: {contact.content}
                                </Contact>
                            )
                        )
                    })}
                </Contacts>
            </BottomContainer>
        </Bg>
    )
}

export default RegionBlock
