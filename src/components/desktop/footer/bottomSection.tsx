import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'

const RegularText = styled.span`
    ${(props) => props.theme.common.footerTextStyle}
    color: #818181;
`

const FooterBottom = styled.div`
    background-color: #2d2d2d;
    width: 100%;
    padding: 20px;
    text-align: center;
`

const FooterBottomSection: React.FC<{}> = () => {
    const copyRight = useCopyRight()
    const t = useTranslation()

    return (
        <FooterBottom>
            <RegularText>{t('general.components.footer.qualification')}</RegularText>
            <br />
            <RegularText>{copyRight}</RegularText>
        </FooterBottom>
    )
}

export default FooterBottomSection
