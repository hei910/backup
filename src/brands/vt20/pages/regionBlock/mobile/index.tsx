import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bg from '@brand/assets/images/regionBlock/bg.jpg'
import useTranslation from '@hooks/useTranslation'
import csIcon from '@images/regionBlock/chat-box.png'
import chatIcon from '@images/regionBlock/icon-chat@2x.png'
import mailIcon from '@images/regionBlock/icon-mail@2x.png'
import brandLogo from '@brand/assets/images/regionBlock/fy_logo.png'
import football from '@brand/assets/images/regionBlock/football.png'
import banner from '@brand/assets/images/regionBlock/tb.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'
import { useSelector } from '@redux'

import bgImg from '@mixins/backgroundImg'
import useCopyRight from '@hooks/useCopyRight'
import { directToHomePage } from '@utils/v1Functions'

const SMainContainer = styled.div`
    ${bgImg(bg, 'cover')};
    /* height: 100vh; */
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const SLogo = styled.img`
    height: auto;
    width: 80%;
    margin-top: 5%;
`
const STopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 7%;
`

const SInfoContainer = styled.div`
    background: rgba(0, 0, 0, 0.6);
    width: 97%;
    border-radius: 10px;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    overflow-x: visible;
    padding: 10px 0;
`

const SRestrictionTitle = styled.div`
    color: #ff4545;
    font-weight: bold;
    text-shadow: 0px 0px 6px #ff4545;
    text-align: center;
    opacity: 1;
    font-size: 32px;
`

const SDescription = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #ffffff;
    text-align: left;
    padding-top: 14px;
    width: 90%;
`
const SpecialColorDescription = styled.span`
    color: #f8ea54;
`
const SCsButton = styled.div`
    border-radius: 40px;
    width: 90%;
    padding: 15px 0;
    background: #ff9f1a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin-top: 14px;
    cursor: pointer;
`
const CSImg = styled.img`
    padding-right: 6px;
`
const SContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 14px;
`
const SContact = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffffff;
    padding-top: 7px;
`

const ContactIcon = styled.img`
    width: 18px;
    height: auto;
    margin-right: 7px;
`
const SFooter = styled.div`
    color: #b4b4b4;
    width: 100%;
    text-align: center;
    /* margin-bottom: 20px; */
    padding-bottom: 20px;
    font-size: 10px;
`

const SBanner = styled.img`
    width: 90%;
    height: auto;
`

const SFootball = styled.img`
    height: 29vh;
    width: auto;
    margin-left: 15%;
    /* margin-top: 5%; */
`
const RegionBlock: React.FC<IRegionBlockProps> = () => {
    const t = useTranslation()
    const copyRight = useCopyRight()
    const { csPhone, webEmail } = useSelector((state) => state.app.brandInfo)
    const csLink = useSelector((state) => state.app.brandInfo.csLink)
    const onCsLinkClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])
    const contacts = [
        {
            type: 'phone',
            icon: chatIcon,
            title: '客服热线',
            content: csPhone,
        },
        {
            type: 'email',
            icon: mailIcon,
            title: '电子邮箱',
            content: webEmail,
        },
    ]
    return (
        <SMainContainer>
            <STopContainer>
                <SBanner src={banner} alt="" />
                <SLogo src={brandLogo} alt="" onClick={directToHomePage} />
                <SInfoContainer>
                    <SRestrictionTitle>ACCESS RESTRICTED</SRestrictionTitle>
                    <SDescription>
                        {t('regionBlock.dear')}:
                        <br />
                        {t('regionBlock.description.1')}
                        <SpecialColorDescription>{t('regionBlock.description.specialColor')}</SpecialColorDescription>
                        {t('regionBlock.description.2')}
                        <br />
                        {t('regionBlock.description.3')}
                    </SDescription>
                    <SCsButton onClick={onCsLinkClick}>
                        <CSImg src={csIcon} alt={t('regionBlock.cs')} /> {t('regionBlock.cs')}
                    </SCsButton>
                    <SContactContainer>
                        {contacts.map((contact) => {
                            return (
                                <SContact>
                                    <ContactIcon src={contact.icon} alt={contact.title} />
                                    {contact.title}：{contact.content}
                                </SContact>
                            )
                        })}
                    </SContactContainer>
                </SInfoContainer>
            </STopContainer>
            <SFootball src={football} alt="" />
            <SFooter>{copyRight}</SFooter>
        </SMainContainer>
    )
}

export default RegionBlock
