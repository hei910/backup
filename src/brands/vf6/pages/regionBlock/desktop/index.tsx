import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'

import IpBan from '@brand/assets/images/regionBlock/desktop/ip-icon.png'
import BgImage from '@brand/assets/images/regionBlock/desktop/bg.png'
import Logo from '@brand/assets/images/regionBlock/desktop/logo.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'

import bgImg from '@mixins/backgroundImg'
import useCopyRight from '@hooks/useCopyRight'
import { directToHomePage } from '@utils/v1Functions'

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${BgImage});
    background-size: cover;
`

const BrandLogo = styled.div`
    position: fixed;
    top: 0px;
    left: 200px;
    ${bgImg(Logo)}
    width: 160px;
    height: 35px;
    margin: 20px;
`

const IpLogo = styled.div`
    ${bgImg(IpBan)};
    height: 100px;
    width: 100px;
    margin: 0 38px;
`

const ContentContainer = styled.div`
    display: flex;
    margin-top: -5%;
`

const InfoContainer = styled.div`
    color: #cbcbcb;
    ${(props) => props.theme.typography.Body1};
`

const InfoTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline};
    font-weight: bold;
    color: #ffffff;
    margin: 6px 0px;
`

const Customer = styled.a`
    color: #84b74c;
`

const Copyright = styled.div`
    position: absolute;
    bottom: 10px;
    color: #cbcbcb;
    ${(props) => props.theme.typography.Body3}
    left: 0;
    right: 0;
    text-align: center;
`
const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const copyRight = useCopyRight()
    const { csPhone, csLink } = useSelector((state) => state.app.brandInfo)

    return (
        <MainContainer>
            <BrandLogo onClick={directToHomePage} data-qa="imgBrandLogo" />
            <ContentContainer>
                <IpLogo data-qa="imgIpBlock" />
                <InfoContainer>
                    <InfoTitle data-qa="txtIpBlockTitle">{t('regionBlock.title')}</InfoTitle>
                    <div>
                        {t('regionBlock.content1')}, {t('regionBlock.ip')}：{ip}
                    </div>
                    <div>
                        {t('regionBlock.content2')}
                        <Customer href={csLink} data-qa="btnIpBlockCs">
                            {t('regionBlock.cs')}
                        </Customer>
                        {t('regionBlock.content3')}：{csPhone}
                    </div>
                </InfoContainer>
            </ContentContainer>
            <Copyright>{copyRight}</Copyright>
        </MainContainer>
    )
}

export default RegionBlock
