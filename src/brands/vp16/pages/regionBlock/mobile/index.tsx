import { useCallback } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import Logo from '@brand/assets/images/regionBlock/logo.png'
import Bg from '@brand/assets/images/regionBlock/mobile/bg.jpg'
import TitleImg from '@brand/assets/images/regionBlock/title.png'
import CsIcon from '@brand/assets/images/regionBlock/icon_cs.png'
import PhoneIcon from '@brand/assets/images/regionBlock/icon_phone.png'
import EmailIcon from '@brand/assets/images/regionBlock/icon_mail.png'
import useTranslation from '@hooks/useTranslation'
import { IRegionBlockProps } from '@pages/regionBlock/types'

import bgImg from '@mixins/backgroundImg'
import useCopyRight from '@hooks/useCopyRight'
import { directToHomePage } from '@utils/v1Functions'

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    ${bgImg(Bg, 'cover')}
`

const Header = styled.div`
    width: 100%;
    padding: 15px 50px;
    background-color: rgba(4, 22, 27, 0.7);
`

const SLogo = styled.div`
    width: 139px;
    height: 41px;
    margin: 0 auto;
    ${bgImg(Logo)}
`

const ContentContainer = styled.div`
    width: 100%;
    min-height: 50%;
    position: absolute;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    width: 80%;
    height: 47px;
    ${bgImg(TitleImg, 'contain')};
`

const Content = styled.div`
    height: 100%;
    color: #ffffff;
    margin: 0 10px;
    ${(props) => props.theme.typography.Body3}
`

const RestrictText = styled.div`
    display: inline-block;
    color: #fff156;
`

const IP = styled.div`
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    margin: 5px auto;
    ${(props) => props.theme.typography.Body3}
`

const Contact = styled.div`
    height: 100%;
    color: #eeeeee;
    margin: 0 auto;
    ${(props) => props.theme.typography.Body3}
`

const BtnContactUs = styled.div`
    height: 100%;
    width: 80%;
    background-color: #fff156;
    margin: 5px auto;
    text-align: center;
    border-radius: 40px;
    padding: 8px;
    color: #1f1f1f;
    text-shadow: none;
    ${(props) => props.theme.typography.Body1}
`

interface IconProps {
    src: string
}

const ContactIcon = styled.div<IconProps>`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 7px;
    vertical-align: middle;
    ${(props) => bgImg(props.src, 'auto')};
`

const Copyright = styled.div`
    color: #999999;
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
    ${(props) => props.theme.typography.Body6}
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const copyRight = useCopyRight()
    const { csLink, csPhone, webEmail } = useSelector((state) => state.app.brandInfo)

    const onButtonClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return (
        <PageContainer>
            <ContentContainer>
                <Header>
                    <SLogo onClick={directToHomePage} />
                </Header>
                <Title />
                <Content>
                    {t('regionBlock.dear')}：
                    <br />
                    {t('regionBlock.description.1')}
                    <RestrictText>{t('regionBlock.description.specialColor')}</RestrictText>
                    {t('regionBlock.description.2')}
                    <br />
                    {t('regionBlock.description.3')}
                </Content>
                <IP>
                    {t('regionBlock.ipText')}：{ip}
                </IP>
                <BtnContactUs onClick={onButtonClick}>
                    <ContactIcon src={CsIcon} />
                    {t('regionBlock.cs')}
                </BtnContactUs>
                <Contact>
                    <ContactIcon src={PhoneIcon} />
                    {t('regionBlock.contacts.csPhone')}：{csPhone}
                </Contact>
                <Contact>
                    <ContactIcon src={EmailIcon} />
                    {t('regionBlock.contacts.email')}：{webEmail}
                </Contact>
            </ContentContainer>
            <Copyright>{copyRight}</Copyright>
        </PageContainer>
    )
}

export default RegionBlock
