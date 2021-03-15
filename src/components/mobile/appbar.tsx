import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import useTranslation from '@hooks/useTranslation'
import { directToHomePage } from '@utils/v1Functions'
import { FullWidthContainer } from './pageContainer'

export interface IAppBarProps {
    isBackToHome?: boolean
    hideBackText?: boolean
    backText?: string
    title?: string
    onBackClick?: () => void
    className?: string
}

const Title = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
`

const Actions = styled.div`
    position: absolute;
    right: 14px;
`

const BackButton = styled.div`
    display: flex;
    align-items: center;
`

const ArrowLeft = styled.div`
    width: 11px;
    height: 11px;
    margin-right: 11px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    transform: rotate(-135deg);

    :before {
        position: absolute;
        height: 2px;
        width: 13px;
        top: -1.51px;
        right: 0;
        box-sizing: border-box;
        box-shadow: inset 0 0 0 32px;
        transform: rotate(-45deg);
        transform-origin: right top;
        content: '';
    }
`

export const SAppBarContainer = styled(FullWidthContainer)`
    display: flex;
    align-items: center;
    height: ${(props) => props.theme.vars.mobileAppBarHeight};
    background-color: ${(props) => props.theme.colors.component.mobile.pageContainer.appBar.bgColor};
    padding: 0 14px;
    color: ${(props) => props.theme.colors.component.mobile.pageContainer.appBar.color};
    box-shadow: ${(props) => props.theme.colors.component.mobile.pageContainer.appBar.boxShadow};
    font-size: 16px;
    position: relative;
`

const AppBar: React.FC<IAppBarProps> = ({
    isBackToHome,
    hideBackText,
    backText,
    title,
    children,
    onBackClick,
    className,
}) => {
    const history = useHistory()
    const t = useTranslation()

    const onBack = useCallback(() => {
        if (onBackClick) {
            onBackClick()
        } else if (isBackToHome) {
            directToHomePage()
        } else {
            history.goBack()
        }
    }, [history, isBackToHome, onBackClick])

    return (
        <SAppBarContainer className={className}>
            {title && <Title>{title}</Title>}
            <BackButton onClick={onBack} data-qa="btnBack">
                <ArrowLeft />
                {!hideBackText && (backText || !title) && <div>{backText || t('general.back')}</div>}
            </BackButton>
            {children && <Actions>{children}</Actions>}
        </SAppBarContainer>
    )
}

export default AppBar
