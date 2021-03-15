import { useCallback } from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import topBg from '@brand/assets/images/regionBlock/bg.jpg'
import csIcon from '@images/regionBlock/chat-box.png'
import chatIcon from '@images/regionBlock/icon-chat@2x.png'
import mailIcon from '@images/regionBlock/icon-mail@2x.png'
import banner from '@brand/assets/images/regionBlock/tb.png'
import brandLogo from '@brand/assets/images/regionBlock/logo.png'
import football from '@brand/assets/images/regionBlock/football.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'
import { useSelector } from '@redux'

import bgImg from '@mixins/backgroundImg'
import useCopyRight from '@hooks/useCopyRight'
import { directToHomePage } from '@utils/v1Functions'

const SMainContainer = styled.div`
    background: #031519;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const SInnerContainer = styled.div`
    display: flex;
`
const SLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SBanner = styled.img``
const SBrandLogo = styled.img``

const SFootball = styled.img`
    margin-top: 200px;
    margin-left: 50px;
`
const TopBg = styled.div`
    ${bgImg(topBg, 'cover')};
    height: 100vh;
    min-height: ${(props) => props.theme.vars.desktopBreakpointHeight};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SInfoContainer = styled.div`
    background: rgba(0, 0, 0, 0.6);
    height: 360px;
    width: 490px;
    border-radius: 20px;
    margin-top: 10px;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: white;
    overflow-x: visible;
`
const SRestrictionTitle = styled.div`
    color: #ff4545;
    font-weight: bold;
    text-shadow: 0px 0px 6px #ff4545;
    text-align: center;
    opacity: 1;
    font-size: 43px;
    width: 500px;
`
const SDescription = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: #ffffff;
    text-align: left;
    padding-top: 10px;

    @media (max-width: 425px) {
        ${(props) => props.theme.typography.Body3}
    }
`
const SpecialColorDescription = styled.span`
    color: #ff9f1a;
`
const SCsButton = styled.div`
    border-radius: 40px;
    width: 333px;
    height: 50px;
    background: #ff9f1a;
    display: flex;
    justify-content: center;
    align-items: center;
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
    font-size: 18px;
    color: #ffffff;
    padding-top: 7px;
`

const ContactIcon = styled.img`
    width: 20px;
    height: auto;
    margin-right: 7px;
`
const SContactSpan = styled.span<{ type: string }>`
    color: #ffffff;
`

const SFooter = styled.div`
    color: #b4b4b4;
    text-align: center;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
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
            <TopBg>
                <SInnerContainer>
                    <SLeftContainer>
                        <SBanner src={banner} alt="" />
                        <SBrandLogo src={brandLogo} alt="" onClick={directToHomePage} />
                        <SInfoContainer>
                            <SRestrictionTitle>ACCESS RESTRICTED</SRestrictionTitle>
                            <SDescription>
                                {t('regionBlock.dear')}:
                                <br />
                                {t('regionBlock.description.1')}
                                <SpecialColorDescription>
                                    {t('regionBlock.description.specialColor')}
                                </SpecialColorDescription>
                                {t('regionBlock.description.2')}
                                <br />
                                {t('regionBlock.description.3')}
                            </SDescription>
                            <SDescription>
                                {t('regionBlock.ipText')}: {ip}
                            </SDescription>
                            <SCsButton onClick={onCsLinkClick}>
                                <CSImg src={csIcon} alt={t('regionBlock.cs')} /> {t('regionBlock.cs')}
                            </SCsButton>
                            <SContactContainer>
                                {contacts.map((contact, index) => {
                                    return (
                                        <SContact key={`contacts-${index}`}>
                                            <ContactIcon src={contact.icon} alt={`${contact.type} icon`} />
                                            {contact.title}：
                                            <SContactSpan type={contact.type}>{contact.content}</SContactSpan>
                                        </SContact>
                                    )
                                })}
                            </SContactContainer>
                        </SInfoContainer>
                    </SLeftContainer>
                    <SFootball src={football} alt="" />
                </SInnerContainer>
                <SFooter>{copyRight}</SFooter>
            </TopBg>
        </SMainContainer>
    )
}

export default RegionBlock
