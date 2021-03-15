import FooterLogo1 from '@sport/assets/img/mobile/footer/footer-logo-1.png'
import FooterLogo2 from '@sport/assets/img/mobile/footer/footer-logo-2.png'
import FooterLogo3 from '@sport/assets/img/mobile/footer/footer-logo-3.png'
import FooterLogo4 from '@sport/assets/img/mobile/footer/footer-logo-4.png'
import React from 'react'
import styled from 'styled-components/macro'

const SFooterWrap = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    flex-direction: column;
`

const SBrandWrap = styled.div`
    display: flex;
    width: 100%;

    &:before,
    &:after {
        content: '';
        flex: 1;
        height: 0;
        margin: auto;
        border: 1px solid ${(props) => props.theme.sport.colors.footer.border};
        display: inline-block;
    }
`

const SBrandLogo = styled.div`
    width: 12vh;
    max-width: 100px;
    margin: 0 20px;
`

const SLicenseWrap = styled.div`
    display: flex;
    justify-content: center;
`

const SLicenseContentWrap = styled.div`
    display: flex;
    flex-direction: column;
`

const SLicenseText = styled.span`
    color: #ddd;
    text-align: center;
    font-size: 11px;
    padding: 0 5px;
`

const SFooterBottomWrap = styled.div`
    padding: 15px 0;
    max-width: 500px;
    text-align: center;
`

const SFooterText = styled.span`
    color: #ddd;
    font-size: 12px;
    line-height: 1.25;
`

const SIconImg = styled.img`
    width: 80%;
    max-width: 90px;
    margin: 0 8px;
    margin-bottom: 10px;
`

const HG3535Footer: React.FC = () => {
    // const brand = useSelector((status) => status.player.brand);

    // const brandLogoMap: Dictionary<React.FC<React.SVGProps<SVGSVGElement>>> = {
    //     boc: BocBrandIcon,
    //     hangsang: HangSangBrandIcon,
    // };

    // const MBrandLogo = brandLogoMap[brand] ?? BrandLogo;

    return (
        <SFooterWrap>
            <SBrandWrap>
                <SBrandLogo>{/* <MBrandLogo /> */}</SBrandLogo>
            </SBrandWrap>
            <SLicenseWrap>
                <SLicenseContentWrap>
                    <SIconImg src={FooterLogo1} alt="Logo" />
                    <SLicenseText>英国GC</SLicenseText>
                    <SLicenseText>监督委员会</SLicenseText>
                </SLicenseContentWrap>
                <SLicenseContentWrap>
                    <SIconImg src={FooterLogo2} alt="Logo" />
                    <SLicenseText>马耳他博彩牌照</SLicenseText>
                    <SLicenseText>(MGA)认证</SLicenseText>
                </SLicenseContentWrap>
                <SLicenseContentWrap>
                    <SIconImg src={FooterLogo3} alt="Logo" />
                    <SLicenseText>英属维尔京群岛</SLicenseText>
                    <SLicenseText>(BVI)认证</SLicenseText>
                </SLicenseContentWrap>
                <SLicenseContentWrap>
                    <SIconImg src={FooterLogo4} alt="Logo" />
                    <SLicenseText>菲律宾(PAGCOR)</SLicenseText>
                    <SLicenseText>监督博彩执照</SLicenseText>
                </SLicenseContentWrap>
            </SLicenseWrap>
            <SFooterBottomWrap>
                <SFooterText>
                    拥有欧洲马耳他博彩管理局(MGA)，英国GC监督委员会(Gambling Commission)和菲律宾政府博彩委员会(pagcor)
                    颂发的合法执照。注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。进行注册并娱乐前，请确保您年满18周岁！
                </SFooterText>
            </SFooterBottomWrap>
        </SFooterWrap>
    )
}

export default HG3535Footer
