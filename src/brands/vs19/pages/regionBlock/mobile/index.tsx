import { useCallback } from 'react'
import styled from 'styled-components/macro'
import Bg from '@brand/assets/images/regionBlock/mobile/bg.png'
import Logo from '@brand/assets/images/regionBlock/mobile/logo.png'
import IPLogo from '@brand/assets/images/regionBlock/mobile/IP-logo.png'
import ChatIcon from '@brand/assets/images/regionBlock/chat-icon.png'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { IRegionBlockProps } from '@pages/regionBlock/types'

import bgImg from '@mixins/backgroundImg'
import useCopyRight from '@hooks/useCopyRight'
import { directToHomePage } from '@utils/v1Functions'

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    ${bgImg(Bg, 'auto')}
`

const LogoDiv = styled.div`
    width: 284px;
    height: 103px;
    margin: 0 auto;
    ${bgImg(Logo)}
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const IPImg = styled.div`
    width: 85px;
    height: 85px;
    ${bgImg(IPLogo)}
`

const DescriptionContainer = styled.div`
    height: auto;
    margin-left: 15px;
    width: 65%;
`

const RestrictText = styled.div`
    color: #caa852;
    ${(props) => props.theme.typography.Subtitle1}

    @media only screen and (min-width: 320px) and (max-height: 640px) {
        font-size: 19px;
    }
`

const DescriptionText = styled.div`
    color: #000000;
    ${(props) => props.theme.typography.Body5}
`

const BottomSection = styled.div`
    position: absolute;
    bottom: 24px;
    width: 100%;
    height: 30%;
    min-height: 142px;
`

const IPText = styled.div`
    color: #4e5077;
    text-align: center;
    ${(props) => props.theme.typography.Subtitle4}
    font-weight: normal;
    @media only screen and (max-width: 320px) and (max-height: 640px) {
        font-size: 13px;
    }
`

const IP = styled.div`
    color: #4e5077;
    text-align: center;
    ${(props) => props.theme.typography.H4Headline};
    @media only screen and (max-width: 320px) and (max-height: 640px) {
        font-size: 19px;
    }
`

const ContactWrapper = styled.div`
    margin-top: 5px;
`

const BtnBlock = styled.div`
    width: 333px;
    padding: 10px 0;
    border-radius: 25px;
    text-align: center;
    margin: 8px auto 0;
    ${(props) => props.theme.typography.Subtitle2};
    @media only screen and (max-width: 320px) and (max-height: 640px) {
        font-size: 12px;
        width: 80%;
    }
`

const BtnContact = styled(BtnBlock)`
    background-image: linear-gradient(to bottom, #e3ba3e, #915118);
    color: #ffffff;
    cursor: pointer;
    user-select: none;
`

const Chat = styled.div`
    width: 30px;
    height: 27px;
    display: inline-block;
    vertical-align: text-bottom;
    margin-right: 10px;
    ${bgImg(ChatIcon)};
    @media only screen and (max-width: 320px) and (max-height: 640px) {
        margin-right: 4px;
        width: 14px;
        height: 12px;
    }
`

const CSNumber = styled(BtnBlock)`
    color: #1f1f1f;
    background-color: #ffffff;
`

const Copyright = styled.div`
    color: #999999;
    text-align: center;
    position: absolute;
    bottom: 5px;
    width: 100%;
    ${(props) => props.theme.typography.Body6}
    @media only screen and (max-width: 320px) and (max-height: 640px) {
        font-size: 10px;
    }
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const copyRight = useCopyRight()
    const { csLink, csPhone } = useSelector((state) => state.app.brandInfo)

    const onButtonClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return (
        <PageContainer>
            <LogoDiv onClick={directToHomePage} />
            <ContentContainer>
                <IPImg />
                <DescriptionContainer>
                    <RestrictText>ACCESS RESTRICTED</RestrictText>
                    <DescriptionText>
                        {t('regionBlock.dear')}：
                        <br />
                        {`${t('regionBlock.description.1')}${t('regionBlock.description.specialColor')}${t(
                            'regionBlock.description.2',
                        )}${t('regionBlock.description.3')}`}
                    </DescriptionText>
                </DescriptionContainer>
            </ContentContainer>
            <BottomSection>
                <IPText>
                    {t('regionBlock.ipText')}：<IP>{ip}</IP>
                </IPText>
                <ContactWrapper>
                    <BtnContact onClick={onButtonClick}>
                        <Chat />
                        {t('regionBlock.cs')}
                    </BtnContact>
                    <CSNumber>
                        {t('regionBlock.contacts.csPhone')}: {csPhone}
                    </CSNumber>
                </ContactWrapper>
            </BottomSection>
            <Copyright>{copyRight}</Copyright>
        </PageContainer>
    )
}

export default RegionBlock
