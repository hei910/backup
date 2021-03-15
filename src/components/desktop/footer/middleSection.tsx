import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import betResponsibilityLogo from '@brand/assets/images/footer/desktop/bet_respon_logo.png'
import safetyLogo from '@brand/assets/images/footer/desktop/safety_logo.png'
import payment1Icon from '@brand/assets/images/footer/desktop/payment1.png'
import payment2Icon from '@brand/assets/images/footer/desktop/payment2.png'
import payment3Icon from '@brand/assets/images/footer/desktop/payment3.png'
import payment4Icon from '@brand/assets/images/footer/desktop/payment4.png'
import complaintIcon from '@brand/assets/images/footer/desktop/complaint_icon.png'
import csPhoneIcon from '@brand/assets/images/footer/desktop/cs_phone_icon.png'
import emailIcon from '@brand/assets/images/footer/desktop/email_icon.png'

const FlexContainer = styled.div`
    display: flex;
`

const RegularText = styled.span`
    ${(props) => props.theme.common.footerTextStyle}
    color: #818181;
`

const FooterMiddle = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 5px;
    background-color: #262626;
`

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1070px;
    margin: auto;
`

const FooterMiddleColumn = styled.div`
    width: 50%;
    min-width: 365px;
`

const FooterMiddleItem = styled.div`
    padding: 10px;
`

const FooterMiddleTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-bottom: 5px;
    color: #ffffff;
`

const PaymentIcon = styled.img`
    height: 28px;
    margin: 10px 10px 0 0;
`

const FlexColumn = styled(FlexContainer)`
    flex-direction: column;
    align-items: center;
`

const Contact = styled(FlexContainer)`
    min-width: 200px;
    padding-bottom: 40px;

    :last-child {
        padding-bottom: 0;
    }
`

const FooterMiddleSection: React.FC<{}> = () => {
    const { brandName, csPhone, complaintPhone, webEmail } = useSelector((state) => state.app.brandInfo)
    const t = useTranslation()

    return (
        <FooterMiddle>
            <FooterWrapper>
                <FooterMiddleColumn>
                    <FooterMiddleItem>
                        <FooterMiddleTitle>{t('general.components.footer.payment.title')}</FooterMiddleTitle>
                        <RegularText>{t('general.components.footer.payment.content', { brandName })}</RegularText>
                        <FlexContainer>
                            <PaymentIcon src={payment1Icon} />
                            <PaymentIcon src={payment2Icon} />
                            <PaymentIcon src={payment3Icon} />
                            <PaymentIcon src={payment4Icon} />
                        </FlexContainer>
                    </FooterMiddleItem>

                    <FlexContainer>
                        <FooterMiddleItem>
                            <FooterMiddleTitle>{t('general.components.footer.safety.title')}</FooterMiddleTitle>
                            <img src={safetyLogo} />
                        </FooterMiddleItem>
                        <FooterMiddleItem>
                            <FooterMiddleTitle>
                                {t('general.components.footer.betResponsibility.title')}
                            </FooterMiddleTitle>
                            <img src={betResponsibilityLogo} />
                        </FooterMiddleItem>
                    </FlexContainer>
                </FooterMiddleColumn>
                <FooterMiddleColumn>
                    <FooterMiddleItem>
                        <FooterMiddleTitle>{t('general.components.footer.contacts.title')}</FooterMiddleTitle>
                    </FooterMiddleItem>
                    <FooterMiddleItem>
                        <FlexContainer>
                            <div>
                                {csPhone && (
                                    <Contact>
                                        <FlexColumn>
                                            <img src={csPhoneIcon} />
                                            <RegularText>{t('general.components.footer.contacts.csPhone')}</RegularText>
                                        </FlexColumn>
                                        <RegularText>{csPhone}</RegularText>
                                    </Contact>
                                )}
                                {complaintPhone && (
                                    <Contact>
                                        <FlexColumn>
                                            <img src={complaintIcon} />
                                            <RegularText>
                                                {t('general.components.footer.contacts.complaintPhone')}
                                            </RegularText>
                                        </FlexColumn>
                                        <RegularText>{complaintPhone}</RegularText>
                                    </Contact>
                                )}
                            </div>
                            {webEmail && (
                                <Contact>
                                    <FlexColumn>
                                        <img src={emailIcon} />
                                        <RegularText>{t('general.components.footer.contacts.email')}</RegularText>
                                    </FlexColumn>
                                    <RegularText>{webEmail}</RegularText>
                                </Contact>
                            )}
                        </FlexContainer>
                    </FooterMiddleItem>
                </FooterMiddleColumn>
            </FooterWrapper>
        </FooterMiddle>
    )
}

export default FooterMiddleSection
