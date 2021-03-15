import styled from 'styled-components/macro'
import tpbg from '@brand/assets/images/contactUs/desktop/top_bg@3x.jpg'
import emailIcon from '@brand/assets/images/contactUs/desktop/img_email.png'
import phoneIcon from '@brand/assets/images/contactUs/desktop/img_mobile.png'
import csIcon from '@brand/assets/images/contactUs/desktop/img_cs.png'
import useTranslation from '@hooks/useTranslation'

import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'

const SMainContainer = styled.div`
    background: #fff;
    padding: 27px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 765px;
`
const STopContainer = styled.div`
    ${bgImg(tpbg, 'cover')};
    min-height: 300px;
    flex: 4.5;
    width: 100%;

    /* min-width: 800px; */
`

const SBottomContainer = styled.div`
    background: #fff;
    flex: 5.5;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 100px 0 0;
    /* min-width: 800px; */
`
const SContentContainer = styled.div<{ marginLeft: number; marginRight: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    ${(props) => `margin-left: ${props.marginLeft}px;`};
    ${(props) => `margin-Right: ${props.marginRight}px;`};
`

const SIcon = styled.img`
    height: 82px;
    width: auto;
    margin-bottom: 22.3px;
`

const STitle = styled.div`
    ${(props) => props.theme.typography.H3Headline}
    font-weight: bold;
    margin-bottom: 22.3px;
    letter-spacing: 1.28px;
`

const SInfo = styled.div`
    max-width: 360px;
    ${(props) => props.theme.typography.H4Headline};
    font-size: 26px;
    text-align: center;
    color: #6e6e6e;
    letter-spacing: 0.26px;
`
const constants = {
    email: {
        type: 'email',
        icon: emailIcon,
    },
    phone: {
        type: 'phone',
        icon: phoneIcon,
    },
    cs: {
        type: 'cs',
        icon: csIcon,
    },
}
const ContactUs = () => {
    const t = useTranslation()
    const { complaintPhone, csPhone, webEmail } = useSelector((state) => state.app.brandInfo)

    return (
        <SMainContainer>
            <STopContainer />
            <SBottomContainer>
                <SContentContainer marginLeft={200} marginRight={10}>
                    <SIcon src={constants.email.icon} alt={t(`contactUs.email.title`)} />
                    <STitle>{t(`contactUs.email.title`)}</STitle>
                    <SInfo>{t(`contactUs.email.24HrService`)}</SInfo>
                    <SInfo>{webEmail}</SInfo>
                </SContentContainer>
                <SContentContainer marginLeft={10} marginRight={10}>
                    <SIcon src={constants.phone.icon} alt={t(`contactUs.phone.title`)} />
                    <STitle>{t(`contactUs.phone.title`)}</STitle>
                    <SInfo>
                        {t(`contactUs.phone.cs`)} : {csPhone}
                    </SInfo>
                    <SInfo>
                        {t(`contactUs.phone.complain`)} : {complaintPhone}
                    </SInfo>
                </SContentContainer>
                <SContentContainer marginLeft={10} marginRight={200}>
                    <SIcon src={constants.cs.icon} alt={t(`contactUs.cs.title`)} />
                    <STitle>{t(`contactUs.cs.title`)}</STitle>
                    <SInfo>{t(`contactUs.cs.content`)}</SInfo>
                </SContentContainer>
            </SBottomContainer>
        </SMainContainer>
    )
}

export default ContactUs
