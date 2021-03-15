import styled from "styled-components/macro";
import useTranslation from '@hooks/useTranslation';
import bgImg from '@mixins/backgroundImg';
import { getLotoColor } from '@pages/lottery/desktop/utils/index';
import * as brandColorCodes from '../constants/resultColorCodes';

interface LotteryResultProps {
    lotoResult?: string[],
    color?: string,
    className?: string,
}

const SLotteryResult = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export const SGameBall = styled.div<{ imgUrl: string}>`
    ${(props) => bgImg(props.imgUrl, 'cover')}
    width: 40px;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
`

export const SEmptyResultText = styled.div`
    font-weight: bold;
`
const LotteryResult = ({ lotoResult, color, className }: LotteryResultProps) => {
    const t = useTranslation()

    return (
        <SLotteryResult className={className}>
            {
                (!lotoResult || lotoResult.length <= 1) ?
                    <SEmptyResultText>{t('lottery.emptyDetail')}</SEmptyResultText>
                    :
                    lotoResult?.map((result: any, idx: number) => (
                        <SGameBall
                            key={'loto-result-' + idx}
                            imgUrl={getLotoColor(+lotoResult[idx], brandColorCodes, color)}
                        >
                            {parseInt(lotoResult[idx], 10)}
                        </SGameBall>
                    ))
            }
        </SLotteryResult>
    )
}

export default LotteryResult;
