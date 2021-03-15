import { useCallback } from 'react'
import styled from 'styled-components/macro'
import Bg from '@brand/assets/images/regionBlock/desktop/bg.png'
import Logo from '@brand/assets/images/regionBlock/desktop/logo.png'
import IPLogo from '@brand/assets/images/regionBlock/desktop/IP-logo.png'
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
    ${bgImg(Bg, '65%')}
`

const LogoDiv = styled.div`
    width: 225px;
    height: 80px;
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
    width: 125px;
    height: 125px;
    ${bgImg(IPLogo)}
`

const DescriptionContainer = styled.div`
    height: auto;
    margin-left: 15px;
`

const RestrictText = styled.div`
    color: #caa852;
    ${(props) => props.theme.typography.H2Headline}
    font-weight: bold;
`

const DescriptionText = styled.div`
    width: 100%;
    color: #000000;
    margin-top: 15px;
    ${(props) => props.theme.typography.Body1}
`

const BottomSection = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 22%;
`

const IPText = styled.div`
    color: #4e5077;
    text-align: center;
    ${(props) => props.theme.typography.Body1};
`

const ContactWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 700px;
    margin: 15px auto 0;
`

const btnBlock = styled.div`
    padding: 3px;
    border-radius: 36px;
    text-align: center;
    ${(props) => props.theme.typography.H4Headline}
`

const BtnContact = styled(btnBlock)`
    width: 263px;
    margin-right: 20px;
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
    ${bgImg(ChatIcon)}
`

const CSNumber = styled(btnBlock)`
    width: 425px;
    color: #1f1f1f;
    background-color: #ffffff;
`

const Copyright = styled.div`
    color: #999999;
    text-align: center;
    position: absolute;
    bottom: 6px;
    width: 100%;
    ${(props) => props.theme.typography.Body2}
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
                        )}`}
                        <br />
                        {t('regionBlock.description.3')}
                    </DescriptionText>
                </DescriptionContainer>
            </ContentContainer>

            <BottomSection>
                <IPText>
                    {t('regionBlock.ipText')}： {ip}
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
