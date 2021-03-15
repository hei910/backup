import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'

import IpBan from '@brand/assets/images/regionBlock/mobile/ip-icon.png'
import BgImage from '@brand/assets/images/regionBlock/mobile/bg.png'
import Logo from '@brand/assets/images/regionBlock/mobile/logo.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'

import bgImg from '@mixins/backgroundImg'
import { directToHomePage } from '@utils/v1Functions'

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${BgImage});
    background-size: cover;
    text-align: center;
`

const BrandLogo = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    ${bgImg(Logo)}
    width: 113px;
    height: 25px;
    margin: 20px 14px;
`
const ContentContainer = styled.div`
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const IpLogo = styled.div`
    ${bgImg(IpBan)};
    height: 100px;
    width: 100px;
    margin-top: -40%;
`
const InfoContainer = styled.div`
    color: #cbcbcb;
    ${(props) => props.theme.typography.Body3};

    > div {
        margin-bottom: 20px;
    }
`

const InfoTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1};
    color: #ffffff;
    margin: 37px 0px 23px;
`

const Customer = styled.a`
    color: #84b74c;
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const { csPhone, csLink } = useSelector((state) => state.app.brandInfo)

    return (
        <MainContainer>
            <BrandLogo onClick={directToHomePage} data-qa="imgBrandLogo" />
            <ContentContainer>
                <IpLogo data-qa="imgIpBlock" />
                <InfoContainer>
                    <InfoTitle data-qa="txtIpBlockTitle">{t('regionBlock.title')}</InfoTitle>
                    <div>
                        {t('regionBlock.content1')}
                        <br /> {t('regionBlock.ip')}：{ip}
                    </div>
                    <div>
                        {t('regionBlock.content2')}
                        <Customer href={csLink} data-qa="btnIpBlockCs">
                            {t('regionBlock.cs')}
                        </Customer>
                        <br />
                        {t('regionBlock.content3')}：{csPhone}
                    </div>
                </InfoContainer>
            </ContentContainer>
        </MainContainer>
    )
}

export default RegionBlock
