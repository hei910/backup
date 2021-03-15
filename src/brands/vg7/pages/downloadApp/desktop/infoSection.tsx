import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import logo1 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_01.png'
import logo2 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_02.png'
import logo3 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_03.png'
import logo4 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_04.png'
import logo5 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_05.png'
import logo6 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_06.png'
import logo7 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_07.png'
import logo8 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_08.png'
import logo9 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_09.png'
import logo10 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo01_10.png'
import logo11 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_01.png'
import logo12 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_02.png'
import logo13 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_03.png'
import logo14 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_04.png'
import logo15 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_05.png'
import logo16 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_06.png'
import logo17 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_07.png'
import logo18 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_08.png'
import logo19 from '@brand/assets/images/downloadApp/desktop/infoSection/low_logo02_09.png'
import phone from '@brand/assets/images/downloadApp/desktop/infoSection/low_icon_01.png'
import email from '@brand/assets/images/downloadApp/desktop/infoSection/low_icon_02.png'
import complaint from '@brand/assets/images/downloadApp/desktop/infoSection/low_icon_03.png'
import useTranslation from '@hooks/useTranslation'

interface SectionProps {
    type: string
}

const SMainContainer = styled.div`
    padding-top: 18px;
    background: #ffffff;
    width: 100%;
    color: #545454;
`
const SMiddleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`
const SInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1366px;
`

const SChildrenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 510px;
`

const STop = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 16px;
`
const SLogoContainer = styled.div`
    height: 53px;
    width: 24.5%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dddddd;
    margin: 1px 1px;
`

const SBottom = styled.div<{ isAbout?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`
const SContactContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 0;
    ${(props) => props.theme.typography.Body2}
`
const SSubheader = styled.div``
const SInfo = styled.div`
    font-weight: 700;
    margin-left: 15px;
    letter-spacing: 0.5px;
`
const SContactImage = styled.img`
    margin-right: 15px;
    width: 20px;
    height: auto;
`
const SSectionWrapper = styled.div`
    width: 455px;
    height: 657px;
    padding: 20px;
`
const STitle = styled.div`
    ${(props) => props.theme.typography.H3Headline};
    display: inline-block;
    border-left: 7px solid #f9a755;
    color: #545454;
    font-weight: 700;
    padding: 5px 25px;
`
const SHr = styled.hr`
    margin: 24px 0;
    border: 0;
    border-top: 1px solid #ccc;
`
const SContent = styled.div`
    ${(props) => props.theme.typography.Body3}
`

interface ISectionTitleProps {
    title?: string
    children: React.ReactNode
}

const responseLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, '', '']
const paymentLogos = [logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, '', '', '']

const SectionTitle = ({ title, children }: ISectionTitleProps) => {
    return (
        <SSectionWrapper>
            {title && <STitle>{title}</STitle>}
            <SHr />
            <SContent>{children}</SContent>
        </SSectionWrapper>
    )
}

const Contacts: React.FC = () => {
    const t = useTranslation()
    const { csPhone, complaintPhone, webEmail } = useSelector((state) => state.app.brandInfo)
    const contactConstants = [
        { imageUrl: phone, sub: 'csPhone', info: csPhone },
        { imageUrl: complaint, sub: 'complaintPhone', info: complaintPhone },
        { imageUrl: email, sub: 'email', info: webEmail },
    ]

    return (
        <>
            {contactConstants.map((contact, index) => {
                return (
                    contact.info && (
                        <SContactContainer key={`download-app-footer-about-${index}`}>
                            <SContactImage src={contact.imageUrl} alt={''} />
                            <SSubheader>{t(`downloadApp.infoSection.contacts.${contact.sub}`)}:</SSubheader>
                            <SInfo>{contact.info}</SInfo>
                        </SContactContainer>
                    )
                )
            })}
        </>
    )
}
const ResponsibilityLogos: React.FC = () => {
    return (
        <>
            {responseLogos.map((logo, index) => (
                <SLogoContainer key={`download-app-footer-responsibility-${index}`}>
                    <img src={logo} alt={''} />
                </SLogoContainer>
            ))}
        </>
    )
}
const PaymentLogos: React.FC = () => {
    return (
        <>
            {paymentLogos.map((logo, index) => (
                <SLogoContainer key={`download-app-footer-payment-${index}`}>
                    <img src={logo} alt={''} />
                </SLogoContainer>
            ))}
        </>
    )
}

const Section: React.FC<SectionProps> = ({ type }) => {
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const t = useTranslation()
    return (
        <SectionTitle title={t(`downloadApp.infoSection.${type}.title`, { brandName })}>
            <SChildrenContainer>
                <STop>{t(`downloadApp.infoSection.${type}.content`, { brandName })}</STop>
                <SBottom isAbout={type === 'about'}>
                    {type === 'about' && <Contacts />}
                    {type === 'betResponsibility' && <ResponsibilityLogos />}
                    {type === 'payment' && <PaymentLogos />}
                </SBottom>
            </SChildrenContainer>
        </SectionTitle>
    )
}

const InfoSection = () => {
    return (
        <SMainContainer>
            <SMiddleContainer>
                <SInnerContainer>
                    <Section type={'about'} />
                    <Section type={'betResponsibility'} />
                    <Section type={'payment'} />
                </SInnerContainer>
            </SMiddleContainer>
        </SMainContainer>
    )
}

export default InfoSection
