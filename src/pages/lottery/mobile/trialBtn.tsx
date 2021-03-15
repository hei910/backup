import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import backgroundImg from '@styles/mixins/backgroundImg'
import TrialImg from '@brand/assets/images/lottery/mobile/icon_trial.svg'
import { useCallback } from 'react'

interface ITrialBtn {
    onTrial: (gameId?: number) => void
}

const STrialBtn = styled.div`
    position: absolute;
    min-width: 80px;
    height: 34px;
    background-color: ${(props) => props.theme.colors.page.mobile.lottery.trialBtnColor};
    bottom: 0;
    right: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${(props) => props.theme.colors.page.mobile.lottery.trialTextColor};
    font-weight: bold;

    :before {
        content: '';
        position: absolute;
        right: 100%;
        top: 0px;
        border-top: 34px solid transparent;
        border-right: 26px solid ${(props) => props.theme.colors.page.mobile.lottery.trialBtnColor};
    }
`

const STrialIcon = styled.div`
    width: 20px;
    height: 20px;
    margin-left: 4px;
    margin-right: 8px;
    ${backgroundImg(TrialImg)}
`

export default ({ onTrial }: ITrialBtn) => {
    const t = useTranslation()

    const onTrialClick = useCallback(() => {
        onTrial && onTrial()
    }, [onTrial])

    return (
        <STrialBtn onClick={onTrialClick} data-qa="btnTrial">
            <STrialIcon />
            {t('lottery.trial')}
        </STrialBtn>
    )
}
