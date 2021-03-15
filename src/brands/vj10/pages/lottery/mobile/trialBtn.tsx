import styled from 'styled-components/macro'
import backgroundImg from '@styles/mixins/backgroundImg'
import TrialImg from '@brand/assets/images/lottery/mobile/icon_trial.png'
import { useCallback } from 'react'

interface ITrialBtn {
    onTrial: (gameId?: number) => void
}

const STrialBtn = styled.div`
    position: absolute;
    width: 67px;
    height: 52px;
    bottom: 0;
    right: 0;
    cursor: pointer;
    color: ${(props) => props.theme.colors.page.mobile.lottery.trialTextColor};
    ${backgroundImg(TrialImg)}
`

export default ({ onTrial }: ITrialBtn) => {
    const onTrialClick = useCallback(() => {
        onTrial && onTrial()
    }, [onTrial])

    return <STrialBtn onClick={onTrialClick} />
}
