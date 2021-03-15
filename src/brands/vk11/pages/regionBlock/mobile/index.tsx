import styled from 'styled-components/macro';
import useTranslation from '@hooks/useTranslation';
import { useSelector } from '@redux';
import useCopyRight from '@hooks/useCopyRight';

import BgImage from '@brand/assets/images/regionBlock/mobile/bg.jpg';
import RestrictImage from '@brand/assets/images/regionBlock/access-restricted.png';
import { IRegionBlockProps } from '@pages/regionBlock/types';
import CsIcon from '@brand/assets/images/regionBlock/icon_cs.png';
import PhoneIcon from '@brand/assets/images/regionBlock/icon_phone.png';
import EmailIcon from '@brand/assets/images/regionBlock/icon_mail.png';

import bgImg from '@mixins/backgroundImg'
import { directToHomePage } from '@utils/v1Functions'

interface IconProps {
    src: string
};

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
`;

const BgContainer = styled.div`
    ${bgImg(BgImage, 'cover', 'no-repeat', 'top')};
    width: 100%;
    height: 108vw;
`;

const ContentContainer = styled.div`
    padding: 30px 20px;
`;

const RestrictLogo = styled.div`
    ${bgImg(RestrictImage, 'contain')};
    height: 30px;
    width: 100%;
`;

const Description = styled.div`
    ${(props) => props.theme.typography.Body3};
    color: #555555;
    text-align: left;
    width: 90%;
    max-width: 330px;
    margin: 20px auto;
`;

const SpecialColorDescription = styled.span`
    ${(props) => props.theme.typography.Body3};
    color: #e72e16;
`;

const ContactContainer = styled.div`
    margin: 0 auto;
    width: 200px;
    text-align: left;
`;

const Contact = styled.div`
    color: #555555;
    margin: 2.5px auto;
    ${(props) => props.theme.typography.Body5}
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
    ${(props) => props.theme.typography.Body6};
    color: #555555;
    padding: 0 25px 15px;
    margin: 35px 0 0;
`;

const RegionBlock: React.FC<IRegionBlockProps> = () => {
    const t = useTranslation();
    const { csPhone, csLink, webEmail } = useSelector((state) => state.app.brandInfo);
    const copyRight = useCopyRight();
    return (
        <MainContainer>
            <BgContainer onClick={directToHomePage} data-qa="imgBrandLogo" />
            <ContentContainer>
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
        </MainContainer>
    )
}

export default RegionBlock
