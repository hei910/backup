import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import bg from '@brand/assets/images/regionBlock/mobile/bg.png'
import logo from '@brand/assets/images/regionBlock/mobile/logo.png'
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    min-height: 750px;
    padding-bottom: 20px;
`

const LogoBg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 55px;
    background-color: rgba(0, 0, 0, 0.7);
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Logo = styled.div`
    ${bgImg(logo, 'contain')}
    height: 35px;
    width: 200px;
`

const Description = styled.div`
    ${(props) => props.theme.typography.Body3};
    color: #ffffff;
    padding: 13px 14px 0;
`

const SpecialColorDescription = styled.span`
    ${(props) => props.theme.typography.Body3};
    color: #ffa33d;
`

const WarningText = styled.div`
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #f18f1d;
    padding-top: 21px;
`

const IpText = styled(Description)`
    text-align: center;
    padding: 17px 0 0;
`

const CsBtn = styled.a`
    ${(props) => props.theme.typography.Body1};
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background-color: #ffa33d;
    color: #ffffff;
    margin-top: 21px;
    padding: 12px 32vw;
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
    ${(props) => props.theme.typography.Body3};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    width: 100%;
    padding: 0 0 7px;
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
            <LogoBg>
                <Logo onClick={directToHomePage} />
            </LogoBg>
            <Container>
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
            </Container>
        </Bg>
    )
}

export default RegionBlock
