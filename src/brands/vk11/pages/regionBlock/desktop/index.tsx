import styled from 'styled-components/macro';
import useTranslation from '@hooks/useTranslation';
import { useSelector } from '@redux';
import useCopyRight from '@hooks/useCopyRight';

import BgImage from '@brand/assets/images/regionBlock/desktop/bg.jpg';
import BrandLogoImage from '@brand/assets/images/regionBlock/desktop/logo.png';
import RestrictImage from '@brand/assets/images/regionBlock/access-restricted.png';
import { IRegionBlockProps } from '@pages/regionBlock/types';
import CsIcon from '@brand/assets/images/regionBlock/icon_cs.png';
import PhoneIcon from '@brand/assets/images/regionBlock/icon_phone.png';
import EmailIcon from '@brand/assets/images/regionBlock/icon_mail.png';

import bgImg from '@mixins/backgroundImg'
import typography from '@mixins/typography'

interface IconProps {
    src: string
};

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
`;

const BgContainer = styled.div`
    ${bgImg(BgImage, 'cover', 'no-repeat', '60% top')};
    width: 100%;
    height: 100vh;
    position: relative;
`;

const ContentContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 1310px;
`;

const BrandLogo = styled.div`
    ${bgImg(BrandLogoImage, 'cover', 'no-repeat', 'center')};
    height: 47px;
    width: 186px;
    margin: 10px 0 6vh;
    cursor: pointer;
`;

const RestrictLogo = styled.div`
    ${bgImg(RestrictImage, 'contain')};
    height: 39px;
    width: 100%;
`;

const Description = styled.div`
    ${typography(20, 24)};
    display: inline-block;
    color: #555555;
    text-align: left;
    margin: 16px 0 30px;
`;

const SpecialColorDescription = styled.span`
    ${typography(20, 24)};
    color: #e72e16;
`;

const ContactContainer = styled.div`
    display: inline-block;
    text-align: left;
`;

const Contact = styled.div`
    color: #555555;
    margin: 2.5px auto;
    font-size: 17px;
`;

const ContactIcon = styled.div<IconProps>`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 7px;
    vertical-align: middle;
    ${(props) => bgImg(props.src, 'contain')};
`;

const ContactLink = styled.a`
    color: #555555;
`;

const UnderlineText = styled.span`
    text-decoration: underline;
`;

const CopyRightText = styled.div`
    color: #555555;
    font-size: 12px;
    margin: 35px 0 0;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
`;

const RegionBlock: React.FC<IRegionBlockProps> = () => {
    const t = useTranslation();
    const { csPhone, csLink, webEmail } = useSelector((state) => state.app.brandInfo);
    const copyRight = useCopyRight();
    const directToHomePage = () => {
        window.location.href = '/';
    };
    return (
        <MainContainer>
            <BgContainer>
                <ContentContainer>
                    <BrandLogo onClick={directToHomePage} data-qa="imgBrandLogo"/>
                    <RestrictLogo data-qa="imgIpBlockTitle"/>
                    <Description data-qa="txtIpBlockDesc">
                        {t('regionBlock.dear')}:
                        <br />
                        {t('regionBlock.description.1')}
                        <SpecialColorDescription>{t('regionBlock.description.specialColor')}</SpecialColorDescription>
                        {t('regionBlock.description.2')}
                        <br />
                        {t('regionBlock.description.3')}
                    </Description>
                    <br />
                    <ContactContainer>
                        <Contact>
                            <ContactIcon src={CsIcon} />
                            <ContactLink href={csLink} data-qa="btnIpBlockCs">{t('regionBlock.cs')}</ContactLink>
                        </Contact>
                        <Contact>
                            <ContactIcon src={PhoneIcon} />
                            {t('regionBlock.contacts.csPhone')}：<UnderlineText data-qa="txtIpBlockTel">{csPhone}</UnderlineText>
                        </Contact>
                        <Contact>
                            <ContactIcon src={EmailIcon} />
                            {t('regionBlock.contacts.email')}：<UnderlineText data-qa="txtIpBlockEmail">{webEmail}</UnderlineText>
                        </Contact>
                    </ContactContainer>
                </ContentContainer>
                <CopyRightText data-qa="txtFooterCopyRight">{copyRight}</CopyRightText>
            </BgContainer>
        </MainContainer>
    )
}

export default RegionBlock
