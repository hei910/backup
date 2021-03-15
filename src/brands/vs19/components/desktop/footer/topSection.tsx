import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

import betResponsibilityLogo1 from '@brand/assets/images/footer/desktop/bet_respon_logo_01.png'
import betResponsibilityLogo2 from '@brand/assets/images/footer/desktop/bet_respon_logo_02.png'
import betResponsibilityLogo3 from '@brand/assets/images/footer/desktop/bet_respon_logo_03.png'
import betResponsibilityLogo4 from '@brand/assets/images/footer/desktop/bet_respon_logo_04.png'
import betResponsibilityLogo5 from '@brand/assets/images/footer/desktop/bet_respon_logo_05.png'
import betResponsibilityLogo6 from '@brand/assets/images/footer/desktop/bet_respon_logo_06.png'
import betResponsibilityLogo7 from '@brand/assets/images/footer/desktop/bet_respon_logo_07.png'
import betResponsibilityLogo8 from '@brand/assets/images/footer/desktop/bet_respon_logo_08.png'
import betResponsibilityLogo9 from '@brand/assets/images/footer/desktop/bet_respon_logo_09.png'
import betResponsibilityLogo10 from '@brand/assets/images/footer/desktop/bet_respon_logo_10.png'

import paymentLogo1 from '@brand/assets/images/footer/desktop/payment_logo_01.png'
import paymentLogo2 from '@brand/assets/images/footer/desktop/payment_logo_02.png'
import paymentLogo3 from '@brand/assets/images/footer/desktop/payment_logo_03.png'
import paymentLogo4 from '@brand/assets/images/footer/desktop/payment_logo_04.png'
import paymentLogo5 from '@brand/assets/images/footer/desktop/payment_logo_05.png'
import paymentLogo6 from '@brand/assets/images/footer/desktop/payment_logo_06.png'
import paymentLogo7 from '@brand/assets/images/footer/desktop/payment_logo_07.png'
import paymentLogo8 from '@brand/assets/images/footer/desktop/payment_logo_08.png'
import paymentLogo9 from '@brand/assets/images/footer/desktop/payment_logo_09.png'

import bgImg from '@mixins/backgroundImg'
import logoImg from '@brand/assets/images/footer/desktop/logo_web.png'

const FlexContainer = styled.div`
    display: flex;
`

const RegularText = styled.span`
    ${(props) => props.theme.typography.Body3}
    color: #CCCCCC;
`

const FooterMiddle = styled.div`
    padding: 20px 0;
    background-color: #262626;
    display: flex;
    justify-content: center;
`

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 1366px;
    margin-left: -180px;
`

const FooterCol = styled.div`
    padding: 5px 20px 20px 20px;
`

const Title = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: #CCCCCC;
    border-left: 3px solid #f29b0d;
    padding-left: 20px;
    margin: 5px 0 20px;
`

const Contact = styled(FlexContainer)`
    padding-bottom: 10px;

    :last-child {
        padding-bottom: 0;
    }
`

const IconTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const IconTableCell = styled.td`
    text-align: center;
    height: 40px;
    width: 68px;

    > img {
        max-width: 80%;
        height: auto;
    }
`

const BrandLogo = styled.div`
    ${bgImg(logoImg, '180px auto')}
    width: 180px;
    margin-right: 20px;
`

const betResponsibilityLogos = [
    betResponsibilityLogo1,
    betResponsibilityLogo2,
    betResponsibilityLogo3,
    betResponsibilityLogo4,
    betResponsibilityLogo5,
    betResponsibilityLogo6,
    betResponsibilityLogo7,
    betResponsibilityLogo8,
    betResponsibilityLogo9,
    betResponsibilityLogo10,
]
const paymentLogos = [
    paymentLogo1,
    paymentLogo2,
    paymentLogo3,
    paymentLogo4,
    paymentLogo5,
    paymentLogo6,
    paymentLogo7,
    paymentLogo8,
    paymentLogo9,
]

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

const FooterMiddleSection: React.FC<{}> = () => {
    const { brandName, csPhone, complaintPhone, webEmail } = useSelector((state) => state.app.brandInfo)
    const t = useTranslation()

    return (
        <FooterMiddle>
            <FooterWrapper>
                <BrandLogo />
                <FooterCol>
                    <Title>{t('downloadApp.infoSection.about.title', { brandName })}</Title>
                    <div>
                        <Contact>
                            <RegularText>{`${t('downloadApp.infoSection.contacts.csPhone')}: ${csPhone}`}</RegularText>
                        </Contact>

                        <Contact>
                            <RegularText>{`${t('downloadApp.infoSection.contacts.email')}: ${webEmail}`}</RegularText>
                        </Contact>
                        <Contact>
                            <RegularText>{`${t(
                                'downloadApp.infoSection.contacts.complaintPhone',
                            )}: ${complaintPhone}`}</RegularText>
                        </Contact>
                    </div>
                </FooterCol>

                <FooterCol>
                    <Title>{t('downloadApp.infoSection.safety.title')}</Title>
                    {renderIconTable(betResponsibilityLogos)}
                </FooterCol>

                <FooterCol>
                    <Title>{t('downloadApp.infoSection.payment.title')}</Title>
                    {renderIconTable(paymentLogos)}
                </FooterCol>
            </FooterWrapper>
        </FooterMiddle>
    )
}

export default FooterMiddleSection
