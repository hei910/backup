import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import csPhoneIcon from '@brand/assets/images/downloadApp/desktop/infoSection/cs_phone_icon.png'
import complaintPhoneIcon from '@brand/assets/images/downloadApp/desktop/infoSection/complaint_phone_icon.png'
import emailIcon from '@brand/assets/images/downloadApp/desktop/infoSection/email_icon.png'
import betResponIcon1 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_01.png'
import betResponIcon2 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_02.png'
import betResponIcon3 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_03.png'
import betResponIcon4 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_04.png'
import betResponIcon5 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_05.png'
import betResponIcon6 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_06.png'
import betResponIcon7 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_07.png'
import betResponIcon8 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_08.png'
import betResponIcon9 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_09.png'
import betResponIcon10 from '@brand/assets/images/downloadApp/desktop/infoSection/bet_respon_10.png'
import paymentIcon1 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_01.png'
import paymentIcon2 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_02.png'
import paymentIcon3 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_03.png'
import paymentIcon4 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_04.png'
import paymentIcon5 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_05.png'
import paymentIcon6 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_06.png'
import paymentIcon7 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_07.png'
import paymentIcon8 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_08.png'
import paymentIcon9 from '@brand/assets/images/downloadApp/desktop/infoSection/payment_09.png'

const Container = styled.div`
    background: #333333;
    padding: 60px 0 23px 0;
`

const InnerContainer = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: 1477px;
`

const FlexContainer = styled.div`
    display: flex;
`

const SSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 460px;
    padding: 20px;
`

const SectionTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    font-weight: bold;
    border-left: 3px solid #f9cc1b;
    padding-left: 10px;
    color: #ffffff;
`

const Line = styled.hr`
    width: 100%;
    margin: 30px 0 20px;
    border: none;
    border-top: 1px solid #dddddd;
`

const SectionContent = styled.div`
    ${(props) => props.theme.typography.Body4}
    color: #ffffff;
`

const Contact = styled(FlexContainer)`
    padding-top: 12px;
`

const ContactIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 13px;
`

const ContactText = styled.span`
    ${(props) => props.theme.typography.Subtitle4}
    color: #ffffff;
`

const IconTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const IconTableCell = styled.td`
    text-align: center;
    height: 49px;
    width: 25%;
    border: 1px solid #444444;
`

type SectionType = 'about' | 'betResponsibility' | 'payment'
interface SectionInfo {
    title: string
    content: string
}

const betResponsibilityIcons = [
    betResponIcon1,
    betResponIcon2,
    betResponIcon3,
    betResponIcon4,
    betResponIcon5,
    betResponIcon6,
    betResponIcon7,
    betResponIcon8,
    betResponIcon9,
    betResponIcon10,
]
const paymentIcons = [
    paymentIcon1,
    paymentIcon2,
    paymentIcon3,
    paymentIcon4,
    paymentIcon5,
    paymentIcon6,
    paymentIcon7,
    paymentIcon8,
    paymentIcon9,
]

const Section: React.FC<SectionInfo> = ({ title, content, children }) => {
    return (
        <SSection>
            <div>
                <SectionTitle>{title}</SectionTitle>
                <Line />
                <SectionContent>{content}</SectionContent>
            </div>
            {children}
        </SSection>
    )
}

const renderContact = (contactIcon: string, contactTitle: string, contactInfo: string) => {
    if (!contactInfo) return null

    return (
        <Contact>
            <ContactIcon src={contactIcon} />
            <ContactText>
                {contactTitle}：{contactInfo}
            </ContactText>
        </Contact>
    )
}

const renderIconTable = (icons: string[]) => {
    return (
        <IconTable>
            <tbody>
                <tr>
                    <IconTableCell>{icons[0] && <img src={icons[0]} />}</IconTableCell>
                    <IconTableCell>{icons[1] && <img src={icons[1]} />}</IconTableCell>
                    <IconTableCell>{icons[2] && <img src={icons[2]} />}</IconTableCell>
                    <IconTableCell>{icons[3] && <img src={icons[3]} />}</IconTableCell>
                </tr>
                <tr>
                    <IconTableCell>{icons[4] && <img src={icons[4]} />}</IconTableCell>
                    <IconTableCell>{icons[5] && <img src={icons[5]} />}</IconTableCell>
                    <IconTableCell>{icons[6] && <img src={icons[6]} />}</IconTableCell>
                    <IconTableCell>{icons[7] && <img src={icons[7]} />}</IconTableCell>
                </tr>
                <tr>
                    <IconTableCell>{icons[8] && <img src={icons[8]} />}</IconTableCell>
                    <IconTableCell>{icons[9] && <img src={icons[9]} />}</IconTableCell>
                    <IconTableCell>{icons[10] && <img src={icons[10]} />}</IconTableCell>
                    <IconTableCell>{icons[11] && <img src={icons[11]} />}</IconTableCell>
                </tr>
            </tbody>
        </IconTable>
    )
}

const InfoSection = () => {
    const { brandName, csPhone, webEmail, complaintPhone } = useSelector((state) => state.app.brandInfo)
    const t = useTranslation()

    const sections: {
        [key in SectionType]: SectionInfo
    } = {
        about: {
            title: t('downloadApp.infoSection.about.title', { brandName }),
            content: t('downloadApp.infoSection.about.content', { brandName }),
        },
        betResponsibility: {
            title: t('downloadApp.infoSection.betResponsibility.title'),
            content: t('downloadApp.infoSection.betResponsibility.content', { brandName }),
        },
        payment: {
            title: t('downloadApp.infoSection.payment.title'),
            content: t('downloadApp.infoSection.payment.content', { brandName }),
        },
    }

    return (
        <Container>
            <InnerContainer>
                <Section {...sections.about}>
                    <div>
                        {renderContact(csPhoneIcon, t('downloadApp.infoSection.contacts.csPhone'), csPhone)}
                        {renderContact(emailIcon, t('downloadApp.infoSection.contacts.email'), webEmail)}
                        {renderContact(
                            complaintPhoneIcon,
                            t('downloadApp.infoSection.contacts.complaintPhone'),
                            complaintPhone,
                        )}
                    </div>
                </Section>
                <Section {...sections.betResponsibility}>{renderIconTable(betResponsibilityIcons)}</Section>
                <Section {...sections.payment}>{renderIconTable(paymentIcons)}</Section>
            </InnerContainer>
        </Container>
    )
}

export default InfoSection
