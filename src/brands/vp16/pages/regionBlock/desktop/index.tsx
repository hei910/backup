import { useCallback } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import Logo from '@brand/assets/images/regionBlock/logo.png'
import Bg from '@brand/assets/images/regionBlock/desktop/bg.jpg'
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
    ${bgImg(Bg, 'cover')}
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
`

const Header = styled.div`
    width: 100%;
    padding: 20px 50px;
    background-color: rgba(4, 22, 27, 0.7);
`

const SLogo = styled.div`
    width: 139px;
    height: 41px;
    ${bgImg(Logo)}
`

const ContentContainer = styled.div`
    width: 40%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    width: 427px;
    height: 47px;
    ${bgImg(TitleImg, 'contain')};
`

const Content = styled.div`
    height: 100%;
    color: #ffffff;
    margin: 15px auto;
    ${(props) => props.theme.typography.Body1}
`

const RestrictText = styled.div`
    display: inline-block;
    color: #f8ea54;
`

const IP = styled.div`
    width: 100%;
    height: 100%;
    color: #ffffff;
    margin: 8px auto;
    text-align: center;
    ${(props) => props.theme.typography.Body1}
`

const BtnContactUs = styled.div`
    height: 100%;
    width: 333px;
    background-color: #f6e51d;
    margin: 8px auto;
    text-align: center;
    border-radius: 40px;
    padding: 10px;
    color: #272623;
    text-shadow: none;
    cursor: pointer;
    user-select: none;
    ${(props) => props.theme.typography.Body1}
`

const Contact = styled.div`
    height: 100%;
    color: #ffffff;
    margin: 0 auto 15px;
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
    bottom: 20px;
    width: 100%;
    ${(props) => props.theme.typography.Subtitle3}
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
            <Header>
                <SLogo onClick={directToHomePage} />
            </Header>
            <ContentContainer>
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
